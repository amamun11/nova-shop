<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);
        $price = fake()->randomElement([85, 140, 220, 310, 480, 650, 920]);

        return [
            'category_id' => Category::factory(),
            'name' => ucwords($name),
            'slug' => str($name)->slug()->value(),
            'summary' => fake()->sentence(),
            'description' => fake()->paragraphs(2, true),
            'price' => $price,
            'compare_at_price' => fake()->boolean(40) ? $price + 50 : null,
            'stock' => fake()->numberBetween(0, 20),
            'featured' => fake()->boolean(30),
            'image' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
            'accent' => fake()->randomElement(['#e9e3da', '#dfd7c7', '#d5cfc0', '#c8c0b0', '#ebe7df']),
            'specs' => [
                ['label' => 'Materials', 'value' => 'Solid Oak, Wool Blend'],
                ['label' => 'Origin', 'value' => 'Porto, Portugal'],
                ['label' => 'Dimensions', 'value' => 'W 60 × D 55 × H 80 cm'],
            ],
        ];
    }
}
