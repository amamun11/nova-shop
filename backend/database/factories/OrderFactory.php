<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 50, 800);
        $shipping = $subtotal >= 250 ? 0.0 : 28.0;

        return [
            'user_id' => User::factory(),
            'reference' => 'NOV-'.fake()->unique()->numerify('#####'),
            'email' => fake()->safeEmail(),
            'name' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'address_line' => fake()->streetAddress(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'country' => 'Portugal',
            'notes' => fake()->optional()->sentence(),
            'status' => 'Reserved',
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'total' => $subtotal + $shipping,
        ];
    }
}
