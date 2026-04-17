<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
   public function index(Request $request)
{
    $search = $request->get('search');
    $categorySlug = $request->get('category');

    $rootCategories = Category::whereNull('parent_id')
        ->withCount('products')
        ->get()
        ->map(fn($cat) => [
            'id'            => $cat->id,
            'name'          => $cat->name,
            'slug'          => $cat->slug,
            'icon'          => $cat->icon ?? null,
            'product_count' => $cat->products_count,
        ]);

    $products = \App\Models\Product::query()
        ->with('category')
        ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
        ->when($categorySlug, fn($q) => $q->whereHas('category', fn($q) => $q->where('slug', $categorySlug)))
        ->paginate(12)
        ->withQueryString()
        ->through(fn($p) => [
            'id'        => $p->id,
            'name'      => $p->name,
            'slug'      => $p->slug,
            'image_url' => $p->image_url ?? null,
            'category'  => $p->category ? ['name' => $p->category->name] : null,
        ]);

    return Inertia::render('Categories/CategoriesPage', [
        'categories'     => Category::tree(),
        'rootCategories' => $rootCategories,
        'products'       => $products,
        'filters'        => $request->only(['search', 'category']),
    ]);
}

  
}