<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_products(): void
    {
        Product::factory()->count(4)->create();

        $response = $this->getJson('/api/products');

        $response->assertOk()
            ->assertJsonCount(4);
    }

    public function test_can_filter_products_by_category(): void
    {
        $cat1 = Category::factory()->create(['slug' => 'seating']);
        $cat2 = Category::factory()->create(['slug' => 'lighting']);

        Product::factory()->create(['category_id' => $cat1->id, 'name' => 'Chair']);
        Product::factory()->create(['category_id' => $cat2->id, 'name' => 'Lamp']);

        $response = $this->getJson('/api/products?category=seating');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['name' => 'Chair'])
            ->assertJsonMissing(['name' => 'Lamp']);
    }

    public function test_can_search_products(): void
    {
        Product::factory()->create(['name' => 'Arco Chair', 'summary' => 'A nice chair']);
        Product::factory()->create(['name' => 'Nara Pendant', 'summary' => 'A ceiling lamp']);

        $response = $this->getJson('/api/products?q=Arco');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['name' => 'Arco Chair'])
            ->assertJsonMissing(['name' => 'Nara Pendant']);
    }

    public function test_can_filter_featured_products(): void
    {
        Product::factory()->create(['name' => 'Featured Item', 'featured' => true]);
        Product::factory()->create(['name' => 'Regular Item', 'featured' => false]);

        $response = $this->getJson('/api/products?featured=1');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['name' => 'Featured Item'])
            ->assertJsonMissing(['name' => 'Regular Item']);
    }

    public function test_can_sort_products_by_price(): void
    {
        Product::factory()->create(['name' => 'Expensive', 'price' => 900]);
        Product::factory()->create(['name' => 'Cheap', 'price' => 50]);

        $response = $this->getJson('/api/products?sort=price_asc');

        $response->assertOk();
        $data = $response->json();
        $this->assertSame('Cheap', $data[0]['name']);
        $this->assertSame('Expensive', $data[1]['name']);
    }

    public function test_can_show_single_product_by_slug(): void
    {
        $product = Product::factory()->create([
            'slug' => 'arco-lounge-chair',
            'name' => 'Arco Lounge Chair',
        ]);

        $response = $this->getJson('/api/products/arco-lounge-chair');

        $response->assertOk()
            ->assertJsonFragment([
                'id' => $product->id,
                'slug' => 'arco-lounge-chair',
                'name' => 'Arco Lounge Chair',
            ]);
    }

    public function test_returns_404_when_product_not_found(): void
    {
        $response = $this->getJson('/api/products/non-existent-product');

        $response->assertNotFound();
    }
}
