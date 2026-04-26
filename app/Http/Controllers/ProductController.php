<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // ─── Listing ──────────────────────────────────────────────────────────────

    public function index(Request $request)
    {
        $search       = $request->get('search');
        $categorySlug = $request->get('category');

        // ── Category filter (includes all descendants) ───────────────────────
        $filterIds = null;
        if ($categorySlug) {
            $selected = Category::where('slug', $categorySlug)
                ->where('is_active', true)
                ->with('allChildren')
                ->first();

            if ($selected) {
                $filterIds = $this->collectAllIds($selected);
            }
        }

        // ── Product query ────────────────────────────────────────────────────
        $products = Product::query()
            ->with('category')
            ->where('is_active', true)
            ->when($search,    fn ($q) => $q->where('name', 'like', "%{$search}%"))
            ->when($filterIds, fn ($q) => $q->whereIn('category_id', $filterIds))
            ->orderBy('sort_order')
            ->paginate(12)
            ->withQueryString()
            ->through(fn ($p) => [
                'id'                => $p->id,
                'name'              => $p->name,
                'slug'              => $p->slug,
                'image'             => $p->image,
                'short_description' => $p->short_description,
                'model_number'      => $p->model_number,
                'category'          => $p->category
                    ? ['name' => $p->category->name, 'slug' => $p->category->slug]
                    : null,
            ]);

        // ── Sidebar category tree ────────────────────────────────────────────
        $categoryTree = Category::whereNull('parent_id')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->with([
                'children' => fn ($q) => $q
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->withCount('products')
                    ->with([
                        'children' => fn ($q2) => $q2
                            ->where('is_active', true)
                            ->orderBy('sort_order')
                            ->withCount('products'),
                    ]),
            ])
            ->withCount('products')
            ->get()
            ->map(fn ($cat) => $this->mapCategoryForSidebar($cat));

        // ── Breadcrumbs ──────────────────────────────────────────────────────
        $breadcrumbs = $this->buildBreadcrumb($categorySlug);

        return Inertia::render('Products/Index', [
            'products'     => $products,
            'categoryTree' => $categoryTree,
            'filters'      => $request->only(['search', 'category']),
            'breadcrumbs'  => $breadcrumbs,
        ]);
    }

    // ─── Detail ───────────────────────────────────────────────────────────────

    public function show(string $slug)
    {
        $product = Product::where('is_active', true)
            ->where('slug', $slug)
            ->with('category.parent.parent')
            ->firstOrFail();

        $related = Product::where('is_active', true)
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->orderBy('sort_order')
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product'     => $product,
            'related'     => $related,
            'breadcrumbs' => $this->buildDetailBreadcrumb($product),
        ]);
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private function collectAllIds(Category $category): array
    {
        $ids = [$category->id];
        foreach ($category->allChildren as $child) {
            $ids = array_merge($ids, $this->collectAllIds($child));
        }
        return $ids;
    }

    private function mapCategoryForSidebar(Category $cat): array
    {
        return [
            'id'            => $cat->id,
            'name'          => $cat->name,
            'slug'          => $cat->slug,
            'icon'          => $cat->icon,
            'product_count' => $cat->products_count,
            'children'      => $cat->children->map(
                fn ($child) => $this->mapCategoryForSidebar($child)
            )->values()->all(),
        ];
    }

    private function buildBreadcrumb(?string $categorySlug): array
    {
        $crumbs = [
            ['label' => 'Home',     'href' => '/'],
            ['label' => 'Products', 'href' => '/products'],
        ];

        if ($categorySlug) {
            $cat = Category::where('slug', $categorySlug)->first();
            if ($cat) {
                $crumbs[] = ['label' => $cat->name, 'href' => null];
            }
        }

        return $crumbs;
    }

    private function buildDetailBreadcrumb(Product $product): array
    {
        $crumbs = [
            ['label' => 'Home',     'href' => '/'],
            ['label' => 'Products', 'href' => '/products'],
        ];

        $cat   = $product->category;
        $chain = [];
        while ($cat) {
            $chain[] = $cat;
            $cat     = $cat->parent ?? null;
        }

        foreach (array_reverse($chain) as $ancestor) {
            $crumbs[] = [
                'label' => $ancestor->name,
                'href'  => '/products?category=' . $ancestor->slug,
            ];
        }

        $crumbs[] = ['label' => $product->name, 'href' => null];

        return $crumbs;
    }
}