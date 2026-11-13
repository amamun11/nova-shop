<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all()->keyBy('slug');

        $products = [
            [
                'category_slug' => 'seating',
                'name' => 'Arco Lounge Chair',
                'slug' => 'arco-lounge-chair',
                'summary' => 'Low-slung solid oak lounge framed in hand-woven neutral bouclé.',
                'description' => 'Designed for quiet corners and long afternoons. The Arco chair balances geometric proportion with relaxed ergonomics, pairing untreated European oak with a dense wool-blend bouclé that wears softly over time.',
                'price' => 680,
                'compare_at_price' => 790,
                'stock' => 6,
                'featured' => true,
                'image' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#dfd7c7',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'W 82 × D 78 × H 72 cm'],
                    ['label' => 'Materials', 'value' => 'Solid European white oak, Belgian bouclé'],
                    ['label' => 'Finish', 'value' => 'Natural matte wax'],
                    ['label' => 'Origin', 'value' => 'Porto, Portugal'],
                ],
            ],
            [
                'category_slug' => 'seating',
                'name' => 'Koto Minimalist Armchair',
                'slug' => 'koto-minimalist-armchair',
                'summary' => 'Sculptural curved armchair with warm ash framing and oat upholstery.',
                'description' => 'A restrained silhouette that anchors smaller spaces without visual weight. Hand-shaped ash curves cradle the back, offering firm lumbar support for reading.',
                'price' => 520,
                'compare_at_price' => null,
                'stock' => 8,
                'featured' => true,
                'image' => 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#e7e1d5',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'W 74 × D 70 × H 76 cm'],
                    ['label' => 'Materials', 'value' => 'Ash wood, brushed linen-cotton'],
                    ['label' => 'Origin', 'value' => 'Kyoto, Japan'],
                ],
            ],
            [
                'category_slug' => 'lighting',
                'name' => 'Nara Pendant Lamp',
                'slug' => 'nara-pendant-lamp',
                'summary' => 'Hand-turned spun brass shade with warm diffused ambient glow.',
                'description' => 'The Nara pendant gathers soft light beneath a shallow, spun-brass disk. Treated with a living finish that patinas naturally, deepening in character every season.',
                'price' => 260,
                'compare_at_price' => 310,
                'stock' => 14,
                'featured' => true,
                'image' => 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#ece6da',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'Ø 38 × H 18 cm'],
                    ['label' => 'Materials', 'value' => 'Spun solid brass, braided cotton cord'],
                    ['label' => 'Socket', 'value' => 'E27 max 40W dimmable'],
                    ['label' => 'Origin', 'value' => 'Milan, Italy'],
                ],
            ],
            [
                'category_slug' => 'lighting',
                'name' => 'Solstice Table Lamp',
                'slug' => 'solstice-table-lamp',
                'summary' => 'Cast concrete base with an opaline sphere for gentle evening light.',
                'description' => 'Subtle weight and soft illumination for bedside tables and quiet shelving. The frosted matte glass dome distributes an even, warm tone.',
                'price' => 195,
                'compare_at_price' => null,
                'stock' => 11,
                'featured' => false,
                'image' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#d8cfbe',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'W 20 × D 20 × H 26 cm'],
                    ['label' => 'Materials', 'value' => 'Raw honed concrete, frosted glass'],
                    ['label' => 'Origin', 'value' => 'Barcelona, Spain'],
                ],
            ],
            [
                'category_slug' => 'tables',
                'name' => 'Sylvan Travertine Coffee Table',
                'slug' => 'sylvan-travertine-coffee-table',
                'summary' => 'Honed Roman travertine slab supported by flared pillar legs.',
                'description' => 'Each piece of unfilled travertine preserves natural veins and tactile fossil pockets. Grounded, monolith form that creates an enduring architectural centerpiece.',
                'price' => 890,
                'compare_at_price' => 1050,
                'stock' => 3,
                'featured' => true,
                'image' => 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#ded4c2',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'W 110 × D 65 × H 32 cm'],
                    ['label' => 'Materials', 'value' => 'Honed unfilled Italian travertine'],
                    ['label' => 'Weight', 'value' => '58 kg'],
                    ['label' => 'Origin', 'value' => 'Tivoli, Italy'],
                ],
            ],
            [
                'category_slug' => 'tables',
                'name' => 'Brutalist Oak Side Table',
                'slug' => 'brutalist-oak-side-table',
                'summary' => 'Hand-chiseled solid oak block with natural exposed grain.',
                'description' => 'Doubles as a side table or bedside plinth. Milled from fallen timber in sustainable forests, seasoned and oiled with raw linseed.',
                'price' => 340,
                'compare_at_price' => null,
                'stock' => 9,
                'featured' => false,
                'image' => 'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#e3ded3',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'W 32 × D 32 × H 44 cm'],
                    ['label' => 'Materials', 'value' => 'Salvaged French white oak'],
                    ['label' => 'Origin', 'value' => 'Burgundy, France'],
                ],
            ],
            [
                'category_slug' => 'textiles',
                'name' => 'Sora Heavy Linen Throw',
                'slug' => 'sora-heavy-linen-throw',
                'summary' => 'Pre-washed stonewashed flax throw in warm earthen bone.',
                'description' => 'Heavyweight 380 GSM European flax linen, garment washed for immediate drape and softness. Finished with raw fringed selvedge borders.',
                'price' => 165,
                'compare_at_price' => 195,
                'stock' => 18,
                'featured' => true,
                'image' => 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#dcd3c4',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => '150 × 210 cm'],
                    ['label' => 'Materials', 'value' => '100% Certified European Flax'],
                    ['label' => 'Care', 'value' => 'Gentle wash cold, line dry'],
                    ['label' => 'Origin', 'value' => 'Ghent, Belgium'],
                ],
            ],
            [
                'category_slug' => 'textiles',
                'name' => 'Terra Wool Cushion',
                'slug' => 'terra-wool-cushion',
                'summary' => 'Hand-spun raw wool cushion with unbleached cotton backing.',
                'description' => 'Tactile texture handwoven on traditional pedal looms. Filled with cruelty-free recycled down feather for a soft, malleable rest.',
                'price' => 85,
                'compare_at_price' => null,
                'stock' => 22,
                'featured' => false,
                'image' => 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#ebe2d6',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => '50 × 50 cm'],
                    ['label' => 'Materials', 'value' => 'Portuguese wool, feather insert'],
                    ['label' => 'Origin', 'value' => 'Serra da Estrela, Portugal'],
                ],
            ],
            [
                'category_slug' => 'objects',
                'name' => 'Mesa Ceramic Vessel',
                'slug' => 'mesa-ceramic-vessel',
                'summary' => 'Wheel-thrown speckled stoneware vessel with matte ash glaze.',
                'description' => 'Each vase is shaped individually by hand, leaving faint fingertip ridges on the exterior. Water-tight and weighted for dried branches or single stems.',
                'price' => 120,
                'compare_at_price' => 145,
                'stock' => 15,
                'featured' => true,
                'image' => 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#e8e0d2',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'Ø 18 × H 28 cm'],
                    ['label' => 'Materials', 'value' => 'High-fire stoneware, wood-ash glaze'],
                    ['label' => 'Origin', 'value' => 'Alentejo, Portugal'],
                ],
            ],
            [
                'category_slug' => 'objects',
                'name' => 'Cast Brass Incense Burner',
                'slug' => 'cast-brass-incense-burner',
                'summary' => 'Solid sand-cast brass tray with reversible needle insert.',
                'description' => 'Sand-cast by hand with subtle grain variations across each surface. Holds stick and cone incense securely while collecting falling ash.',
                'price' => 95,
                'compare_at_price' => null,
                'stock' => 25,
                'featured' => false,
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#ded7c9',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'W 22 × D 4 × H 2 cm'],
                    ['label' => 'Materials', 'value' => '100% Solid sand-cast brass'],
                    ['label' => 'Origin', 'value' => 'Kyoto, Japan'],
                ],
            ],
            [
                'category_slug' => 'seating',
                'name' => 'Forma Sculptural Stool',
                'slug' => 'forma-sculptural-stool',
                'summary' => 'Solid cast aluminum stool with hand-polished mirror rim.',
                'description' => 'Functions as a stool, side table, or sculptural statement. Currently resting between production batches in our Porto foundry.',
                'price' => 290,
                'compare_at_price' => 340,
                'stock' => 0,
                'featured' => false,
                'image' => 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85',
                'accent' => '#d6cdc0',
                'specs' => [
                    ['label' => 'Dimensions', 'value' => 'Ø 35 × H 45 cm'],
                    ['label' => 'Materials', 'value' => 'Cast recycled aluminum'],
                    ['label' => 'Weight', 'value' => '12 kg'],
                    ['label' => 'Origin', 'value' => 'Porto, Portugal'],
                ],
            ],
        ];

        foreach ($products as $item) {
            $cat = $categories->get($item['category_slug']);
            if (! $cat) {
                continue;
            }

            unset($item['category_slug']);
            $item['category_id'] = $cat->id;

            Product::updateOrCreate(['slug' => $item['slug']], $item);
        }
    }
}
