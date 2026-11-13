<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_place_order(): void
    {
        $product = Product::factory()->create([
            'price' => 100.00,
            'stock' => 10,
        ]);

        $payload = [
            'name' => 'Claire Dupont',
            'email' => 'claire@example.com',
            'phone' => '+351 912 345 678',
            'address_line' => 'Rua das Flores 12',
            'city' => 'Porto',
            'postal_code' => '4000-069',
            'country' => 'Portugal',
            'notes' => 'Please leave with reception',
            'items' => [
                ['product_id' => $product->id, 'quantity' => 2],
            ],
        ];

        $response = $this->postJson('/api/orders', $payload);

        $response->assertCreated()
            ->assertJsonPath('email', 'claire@example.com')
            ->assertJsonPath('subtotal', 200)
            ->assertJsonPath('shipping', 28) // Subtotal < 250 -> 28 shipping
            ->assertJsonPath('total', 228);

        $this->assertDatabaseHas('orders', [
            'email' => 'claire@example.com',
            'city' => 'Porto',
        ]);

        $this->assertSame(8, $product->fresh()->stock);
    }

    public function test_order_qualifies_for_free_shipping_over_250(): void
    {
        $product = Product::factory()->create([
            'price' => 300.00,
            'stock' => 5,
        ]);

        $payload = [
            'name' => 'Claire Dupont',
            'email' => 'claire@example.com',
            'address_line' => 'Rua das Flores 12',
            'city' => 'Porto',
            'postal_code' => '4000-069',
            'country' => 'Portugal',
            'items' => [
                ['product_id' => $product->id, 'quantity' => 1],
            ],
        ];

        $response = $this->postJson('/api/orders', $payload);

        $response->assertCreated()
            ->assertJsonPath('subtotal', 300)
            ->assertJsonPath('shipping', 0)
            ->assertJsonPath('total', 300);
    }

    public function test_authenticated_user_can_place_order_and_link_account(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;
        $product = Product::factory()->create(['price' => 150.00, 'stock' => 4]);

        $payload = [
            'name' => $user->name,
            'email' => $user->email,
            'address_line' => 'Avenida dos Aliados 44',
            'city' => 'Porto',
            'postal_code' => '4000-006',
            'country' => 'Portugal',
            'items' => [
                ['product_id' => $product->id, 'quantity' => 1],
            ],
        ];

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/orders', $payload);

        $response->assertCreated();

        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'email' => $user->email,
        ]);
    }

    public function test_order_fails_if_stock_is_insufficient(): void
    {
        $product = Product::factory()->create(['price' => 100.00, 'stock' => 1]);

        $payload = [
            'name' => 'Claire Dupont',
            'email' => 'claire@example.com',
            'address_line' => 'Rua das Flores 12',
            'city' => 'Porto',
            'postal_code' => '4000-069',
            'country' => 'Portugal',
            'items' => [
                ['product_id' => $product->id, 'quantity' => 2],
            ],
        ];

        $response = $this->postJson('/api/orders', $payload);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['items']);

        $this->assertSame(1, $product->fresh()->stock);
    }

    public function test_can_get_order_by_reference(): void
    {
        $order = Order::factory()->create(['reference' => 'NOV-ABC1234']);
        OrderItem::factory()->create(['order_id' => $order->id]);

        $response = $this->getJson('/api/orders/NOV-ABC1234');

        $response->assertOk()
            ->assertJsonPath('reference', 'NOV-ABC1234')
            ->assertJsonCount(1, 'items');
    }

    public function test_authenticated_user_can_list_their_orders(): void
    {
        $user = User::factory()->create(['email' => 'user@example.com']);
        $token = $user->createToken('test')->plainTextToken;

        $userOrder = Order::factory()->create(['user_id' => $user->id, 'reference' => 'NOV-MINE01']);
        OrderItem::factory()->create(['order_id' => $userOrder->id]);

        $otherOrder = Order::factory()->create(['user_id' => null, 'email' => 'stranger@example.com', 'reference' => 'NOV-OTHER']);
        OrderItem::factory()->create(['order_id' => $otherOrder->id]);

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/orders');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['reference' => 'NOV-MINE01'])
            ->assertJsonMissing(['reference' => 'NOV-OTHER']);
    }
}
