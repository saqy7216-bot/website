<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    // ── Public ────────────────────────────────────────────────────────────────

    /** /products  — listing page, optionally filtered by category slug */
    public function index(Request $request)
    {
        $categorySlug = $request->query('category');

        $query = Product::active()->ordered()->with('category');

        if ($categorySlug) {
            // Collect this category + all descendant IDs so filtering works at any depth
            $category   = Category::where('slug', $categorySlug)->firstOrFail();
            $categoryIds = $this->descendantIds($category);

            $query->whereIn('category_id', $categoryIds);
        }

        $products   = $query->paginate(12)->withQueryString();
        $categories = Category::tree();           // full tree for sidebar filter

        return Inertia::render('Products/Index', [
            'products'        => $products,
            'categories'      => $categories,
            'activeCategorySlug' => $categorySlug,
        ]);
    }

    /** /products/{slug}  — product detail page */
    public function show(string $slug)
    {
        $product = Product::active()
            ->where('slug', $slug)
            ->with('category.parent.parent')   // up to 3 levels for breadcrumb
            ->firstOrFail();

        $related = Product::active()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->ordered()
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product'    => $product,
            'breadcrumb' => $product->breadcrumb(),
            'related'    => $related,
        ]);
    }

    // ── Admin CRUD ────────────────────────────────────────────────────────────

    public function adminIndex()
    {
        $products = Product::with('category')->ordered()->paginate(20);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Form', [
            'categories' => Category::tree(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());

        $validated['slug'] = Str::slug($validated['name']);

        Product::create($validated);

        return redirect()->route('admin.products.index')
                         ->with('success', 'Product created.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Form', [
            'product'    => $product,
            'categories' => Category::tree(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate($this->rules($product->id));

        $product->update($validated);

        return redirect()->route('admin.products.index')
                         ->with('success', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')
                         ->with('success', 'Product deleted.');
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /**
     * Return the IDs of a category and all its descendants (recursive).
     */
    private function descendantIds(Category $category): array
    {
        $ids = [$category->id];

        foreach ($category->allChildren as $child) {
            $ids = array_merge($ids, $this->descendantIds($child));
        }

        return $ids;
    }

    private function rules(?int $ignoreId = null): array
    {
        return [
            'category_id'       => 'nullable|exists:categories,id',
            'name'              => 'required|string|max:255',
            'model_number'      => 'nullable|string|max:100',
            'short_description' => 'nullable|string',
            'description'       => 'nullable|string',
            'overview'          => 'nullable|string',
            'image'             => 'nullable|string',
            'hero_image'        => 'nullable|string',
            'overview_image'    => 'nullable|string',
            'specs'             => 'nullable|array',
            'features'          => 'nullable|array',
            'highlights'        => 'nullable|array',
            'downloads'         => 'nullable|array',
            'price'             => 'nullable|numeric|min:0',
            'is_featured'       => 'boolean',
            'is_active'         => 'boolean',
            'sort_order'        => 'integer|min:0',
        ];
    }
}