<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [

            'auth' => [
                'user'        => $request->user(),
                'roles'       => $request->user()?->getRoleNames(),
                'permissions' => $request->user()?->getAllPermissions()->pluck('name'),
            ],

            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],

            // ── Navbar mega-menu categories ──────────────────────────────────
            // Shared on every page so AppLayout can pass them to <Navbar>.
            // Shape matches what Navbar.jsx expects:
            //   { id, name, slug, products: [...], subcategories: [...] }
            'categories' => fn () => Category::whereNull('parent_id')
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->with([
                    // Direct products on root (e.g. "Batteries", "PV Module")
                    'products' => fn ($q) => $q
                        ->where('is_active', true)
                        ->orderBy('sort_order')
                        ->select('id', 'name', 'slug', 'category_id'),

                    // Sub-categories + their direct products
                    'children' => fn ($q) => $q
                        ->where('is_active', true)
                        ->orderBy('sort_order')
                        ->with([
                            'products' => fn ($q2) => $q2
                                ->where('is_active', true)
                                ->orderBy('sort_order')
                                ->select('id', 'name', 'slug', 'category_id'),
                        ]),
                ])
                ->get()
                ->map(fn ($root) => [
                    'id'            => $root->id,
                    'name'          => $root->name,
                    'slug'          => $root->slug,
                    'products'      => $root->products->map(fn ($p) => [
                        'id'   => $p->id,
                        'name' => $p->name,
                        'slug' => $p->slug,
                    ])->values()->all(),
                    // Navbar reads "subcategories", not "children"
                    'subcategories' => $root->children->map(fn ($sub) => [
                        'id'       => $sub->id,
                        'name'     => $sub->name,
                        'slug'     => $sub->slug,
                        'products' => $sub->products->map(fn ($p) => [
                            'id'   => $p->id,
                            'name' => $p->name,
                            'slug' => $p->slug,
                        ])->values()->all(),
                    ])->values()->all(),
                ])->all(),
        ]);
    }
}