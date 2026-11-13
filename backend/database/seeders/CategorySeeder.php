<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Seating',
                'slug' => 'seating',
                'blurb' => 'Chairs, stools, and low lounges built for lingering.',
                'cover' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Lighting',
                'slug' => 'lighting',
                'blurb' => 'Pendants, task lamps, and diffused floor fixtures.',
                'cover' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Tables',
                'slug' => 'tables',
                'blurb' => 'Low coffee tables, consoles, and solid wood desks.',
                'cover' => 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Textiles',
                'slug' => 'textiles',
                'blurb' => 'Washed linen throws, heavy wool cushions, and woven rugs.',
                'cover' => 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'Objects',
                'slug' => 'objects',
                'blurb' => 'Stoneware vessels, cast brass trays, and desk pieces.',
                'cover' => 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
