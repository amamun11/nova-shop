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
                'name' => 'আসবাবপত্র',
                'slug' => 'furniture',
                'blurb' => 'ঘর সাজানোর জন্য সেরা চেয়ার, সোফা ও টেবিল।',
                'cover' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'ইলেকট্রনিক্স',
                'slug' => 'electronics',
                'blurb' => 'স্মার্টফোন, ল্যাপটপ ও গ্যাজেট।',
                'cover' => 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'পোশাক',
                'slug' => 'clothing',
                'blurb' => 'পুরুষ ও মহিলাদের আধুনিক পোশাক সংগ্রহ।',
                'cover' => 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'রান্নাঘর',
                'slug' => 'kitchen',
                'blurb' => 'রান্নার সরঞ্জাম ও কিচেন অ্যাক্সেসরিজ।',
                'cover' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'সৌন্দর্য চর্চা',
                'slug' => 'beauty',
                'blurb' => 'স্কিনকেয়ার, হেয়ারকেয়ার ও বিউটি প্রোডাক্ট।',
                'cover' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'name' => 'খেলাধুলা',
                'slug' => 'sports',
                'blurb' => 'ফিটনেস ও স্পোর্টস ইকুইপমেন্ট।',
                'cover' => 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
