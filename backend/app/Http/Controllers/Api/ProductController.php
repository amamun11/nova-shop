<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    /**
     * Display a listing of products with optional filters.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Product::with('category');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($builder) use ($request) {
                $builder->where('slug', $request->string('category'));
            });
        }

        if ($request->filled('q')) {
            $term = '%'.$request->string('q').'%';
            $query->where(function ($builder) use ($term) {
                $builder->where('name', 'like', $term)
                    ->orWhere('summary', 'like', $term)
                    ->orWhere('description', 'like', $term);
            });
        }

        if ($request->boolean('featured')) {
            $query->where('featured', true);
        }

        match ($request->string('sort')->value()) {
            'newest' => $query->orderByDesc('created_at'),
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            default => $query->orderByDesc('featured')->orderByDesc('id'),
        };

        return ProductResource::collection($query->get());
    }

    /**
     * Display the specified product by its slug.
     */
    public function show(string $slug): ProductResource
    {
        $product = Product::with('category')->where('slug', $slug)->firstOrFail();

        return new ProductResource($product);
    }
}
