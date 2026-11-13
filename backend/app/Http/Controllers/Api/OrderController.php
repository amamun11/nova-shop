<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    /**
     * List orders for the authenticated user.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();

        $orders = Order::with('items')
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhere('email', $user->email);
            })
            ->latest()
            ->get();

        return OrderResource::collection($orders);
    }

    /**
     * Show a specific order by reference.
     */
    public function show(string $reference): OrderResource
    {
        $order = Order::with('items')
            ->where('reference', $reference)
            ->firstOrFail();

        return new OrderResource($order);
    }

    /**
     * Place a new order (Checkout).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'address_line' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:50'],
            'country' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $authenticatedUser = auth('sanctum')->user();

        $order = DB::transaction(function () use ($validated, $authenticatedUser) {
            $productIds = collect($validated['items'])->pluck('product_id')->all();
            $products = Product::whereIn('id', $productIds)->lockForUpdate()->get()->keyBy('id');

            $subtotal = 0.0;
            $itemsData = [];

            foreach ($validated['items'] as $item) {
                $product = $products->get($item['product_id']);

                if (! $product) {
                    throw ValidationException::withMessages([
                        'items' => ['One or more products could not be found.'],
                    ]);
                }

                if ($product->stock < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'items' => ["The piece '{$product->name}' does not have enough stock available (only {$product->stock} left)."],
                    ]);
                }

                $linePrice = (float) $product->price;
                $quantity = (int) $item['quantity'];
                $subtotal += $linePrice * $quantity;

                // Decrement stock
                $product->decrement('stock', $quantity);

                $itemsData[] = [
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'price' => $linePrice,
                    'quantity' => $quantity,
                    'image' => $product->image,
                ];
            }

            $shipping = ($subtotal >= 250 || $subtotal == 0) ? 0.0 : 28.0;
            $total = $subtotal + $shipping;

            $reference = 'NOV-'.strtoupper(Str::random(6));
            while (Order::where('reference', $reference)->exists()) {
                $reference = 'NOV-'.strtoupper(Str::random(6));
            }

            $order = Order::create([
                'user_id' => $authenticatedUser?->id,
                'reference' => $reference,
                'email' => $validated['email'],
                'name' => $validated['name'],
                'phone' => $validated['phone'] ?? null,
                'address_line' => $validated['address_line'],
                'city' => $validated['city'],
                'postal_code' => $validated['postal_code'],
                'country' => $validated['country'],
                'notes' => $validated['notes'] ?? null,
                'status' => 'Reserved',
                'subtotal' => $subtotal,
                'shipping' => $shipping,
                'total' => $total,
            ]);

            $order->items()->createMany($itemsData);

            return $order;
        });

        return (new OrderResource($order->load('items')))
            ->response()
            ->setStatusCode(201);
    }
}
