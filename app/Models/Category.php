<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'description',
        'icon',
        'depth',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'depth'     => 'integer',
    ];

    // ── Relationships ──────────────────────────────────────────────────────────

    /** Parent category (null if this is a root/top-level category) */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /** Direct children of this category */
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('sort_order');
    }

    /**
     * Recursive children — eager-load the entire subtree in one query set.
     * Usage: Category::with('allChildren.allChildren')->get()
     */
    public function allChildren(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')
                    ->orderBy('sort_order')
                    ->with('allChildren');
    }

    /** Products directly assigned to this category node */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class)->orderBy('sort_order');
    }

    // ── Scopes ─────────────────────────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeRoots($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    // ── Helpers ────────────────────────────────────────────────────────────────

    /**
     * Return the full category tree as a nested collection.
     * Useful for the navbar mega-menu.
     *
     * Usage:
     *   $tree = Category::tree();
     */
    public static function tree(): \Illuminate\Support\Collection
    {
        return static::active()
            ->roots()
            ->ordered()
            ->with('allChildren.products')
            ->with('products')
            ->get();
    }

    /** True if this category has no parent */
    public function isRoot(): bool
    {
        return is_null($this->parent_id);
    }

    /** True if this category has children */
    public function hasChildren(): bool
    {
        return $this->children()->exists();
    }
}