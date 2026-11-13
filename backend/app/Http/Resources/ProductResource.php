<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'description' => $this->description,
            'price' => (float) $this->price,
            'compare_at_price' => $this->compare_at_price !== null ? (float) $this->compare_at_price : null,
            'stock' => (int) $this->stock,
            'featured' => (bool) $this->featured,
            'image' => $this->image,
            'accent' => $this->accent,
            'specs' => $this->specs ?? [],
            'category' => [
                'name' => $this->category?->name ?? '',
                'slug' => $this->category?->slug ?? '',
            ],
        ];
    }
}
