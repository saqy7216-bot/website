<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'model_number',
        'image',
        'hero_image',
        'overview_image',
        'short_description',
        'description',
        'overview',
        'specs',
        'features',
        'highlights',
        'downloads',
        'price',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'specs'       => 'array',   // [{"label":"...","value":"..."}, …]
        'features'    => 'array',   // ["...", "...", …]
        'highlights'  => 'array',   // ["...", "...", …]
        'downloads'   => 'array',   // [{"label":"...","url":"..."}, …]
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
        'price'       => 'decimal:2',
    ];

    // ── Relationships ──────────────────────────────────────────────────────────

    /**
     * The category this product belongs to.
     * Can be a root category, sub-category, or sub-sub-category — any node in the tree.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // ── Scopes ─────────────────────────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    public function scopeInCategory($query, int $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    // ── Helpers ────────────────────────────────────────────────────────────────

    /** Return the full ancestor breadcrumb as a collection of Category models. */
    public function breadcrumb(): \Illuminate\Support\Collection
    {
        $crumbs = collect();
        $cat    = $this->category;

        while ($cat) {
            $crumbs->prepend($cat);
            $cat = $cat->parent;
        }

        return $crumbs;
    }
}