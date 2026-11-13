<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_categories_with_product_count(): void
    {
        $category = Category::factory()->create([
            'name' => 'Seating',
            'slug' => 'seating',
        ]);

        Product::factory()->count(3)->create([
            'category_id' => $category->id,
        ]);

        $response = $this->getJson('/api/categories');

        $response->assertOk()
            ->assertJsonFragment([
                'id' => $category->id,
                'name' => 'Seating',
                'slug' => 'seating',
                'products_count' => 3,
            ]);
    }
}
