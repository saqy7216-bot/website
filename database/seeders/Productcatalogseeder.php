<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductCatalogSeeder extends Seeder
{
    /**
     * Seed the full Rizon Technologies product catalog.
     *
     * Tree structure:
     *   Batteries            (depth 0) → products directly
     *   UPS                  (depth 0)
     *     All-In-One         (depth 1) → products
     *     On-Line            (depth 1) → products
     *     Line Interactive   (depth 1) → products
     *   Inverter             (depth 0)
     *     On Grid            (depth 1) → products
     *     Hybrid             (depth 1) → products
     *     Off Grid           (depth 1) → products
     *   PV Module            (depth 0) → products directly
     */
    public function run(): void
    {
        // ── 1. BATTERIES ──────────────────────────────────────────────────────
        $batteries = Category::create([
            'name'       => 'Batteries',
            'slug'       => 'batteries',
            'depth'      => 0,
            'sort_order' => 1,
        ]);

        foreach ([
            ['Lead Acid',                        'lead-acid',                       1],
            ['AGM & GEL (Hybrid)',                'agm-gel-hybrid',                  2],
            ['LIFEpo4 (Lithium Iron Phosphate)',  'lifepo4-lithium-iron-phosphate',  3],
        ] as [$name, $slug, $order]) {
            Product::create([
                'category_id' => $batteries->id,
                'name'        => $name,
                'slug'        => $slug,
                'sort_order'  => $order,
                'is_active'   => true,
            ]);
        }

        // ── 2. UPS ────────────────────────────────────────────────────────────
        $ups = Category::create([
            'name'       => 'UPS',
            'slug'       => 'ups',
            'depth'      => 0,
            'sort_order' => 2,
        ]);

        // 2a. All-In-One
        $allInOne = Category::create([
            'parent_id'  => $ups->id,
            'name'       => 'All-In-One',
            'slug'       => 'ups-all-in-one',
            'depth'      => 1,
            'sort_order' => 1,
        ]);
        foreach ([
            ['Rodimus Cube Series', 'rodimus-cube-series', 1],
            ['Magnus Tower Series', 'magnus-tower-series', 2],
        ] as [$name, $slug, $order]) {
            Product::create([
                'category_id' => $allInOne->id,
                'name'        => $name,
                'slug'        => $slug,
                'sort_order'  => $order,
                'is_active'   => true,
            ]);
        }

        // 2b. On-Line
        $onLine = Category::create([
            'parent_id'  => $ups->id,
            'name'       => 'On-Line',
            'slug'       => 'ups-on-line',
            'depth'      => 1,
            'sort_order' => 2,
        ]);
        foreach ([
            ['Optimus Prime Series', 'optimus-prime-series', 1],
            ['Ultra Magnus Series',  'ultra-magnus-series',  2],
            ['Megatron Series',      'megatron-series',      3],
            ['Galvatron Series',     'galvatron-series',     4],
        ] as [$name, $slug, $order]) {
            Product::create([
                'category_id' => $onLine->id,
                'name'        => $name,
                'slug'        => $slug,
                'sort_order'  => $order,
                'is_active'   => true,
            ]);
        }

        // 2c. Line Interactive
        $lineInteractive = Category::create([
            'parent_id'  => $ups->id,
            'name'       => 'Line Interactive',
            'slug'       => 'ups-line-interactive',
            'depth'      => 1,
            'sort_order' => 3,
        ]);
        foreach ([
            ['Bumblebee Series',  'bumblebee-series',  1],
            ['Jazz Series',       'jazz-series',       2],
            ['Ironhide Series',   'ironhide-series',   3],
        ] as [$name, $slug, $order]) {
            Product::create([
                'category_id' => $lineInteractive->id,
                'name'        => $name,
                'slug'        => $slug,
                'sort_order'  => $order,
                'is_active'   => true,
            ]);
        }

        // ── 3. INVERTER ───────────────────────────────────────────────────────
        $inverter = Category::create([
            'name'       => 'Inverter',
            'slug'       => 'inverter',
            'depth'      => 0,
            'sort_order' => 3,
        ]);

        // 3a. On Grid
        $onGrid = Category::create([
            'parent_id'  => $inverter->id,
            'name'       => 'On Grid',
            'slug'       => 'inverter-on-grid',
            'depth'      => 1,
            'sort_order' => 1,
        ]);
        foreach ([
            ['Single Phase On-Grid', 'single-phase-on-grid', 1],
            ['Three Phase On-Grid',  'three-phase-on-grid',  2],
        ] as [$name, $slug, $order]) {
            Product::create([
                'category_id' => $onGrid->id,
                'name'        => $name,
                'slug'        => $slug,
                'sort_order'  => $order,
                'is_active'   => true,
            ]);
        }

        // 3b. Hybrid
        $hybrid = Category::create([
            'parent_id'  => $inverter->id,
            'name'       => 'Hybrid',
            'slug'       => 'inverter-hybrid',
            'depth'      => 1,
            'sort_order' => 2,
        ]);
        foreach ([
            ['Single Phase Hybrid', 'single-phase-hybrid', 1],
            ['Three Phase Hybrid',  'three-phase-hybrid',  2],
        ] as [$name, $slug, $order]) {
            Product::create([
                'category_id' => $hybrid->id,
                'name'        => $name,
                'slug'        => $slug,
                'sort_order'  => $order,
                'is_active'   => true,
            ]);
        }

        // 3c. Off Grid
        $offGrid = Category::create([
            'parent_id'  => $inverter->id,
            'name'       => 'Off Grid',
            'slug'       => 'inverter-off-grid',
            'depth'      => 1,
            'sort_order' => 3,
        ]);
        Product::create([
            'category_id' => $offGrid->id,
            'name'        => 'Off Grid Inverter Series',
            'slug'        => 'off-grid-inverter-series',
            'sort_order'  => 1,
            'is_active'   => true,
        ]);

        // ── 4. PV MODULE ──────────────────────────────────────────────────────
        $pvModule = Category::create([
            'name'       => 'PV Module',
            'slug'       => 'pv-module',
            'depth'      => 0,
            'sort_order' => 4,
        ]);

        foreach ([
            ['Mono Crystalline', 'mono-crystalline', 1],
            ['Poly Crystalline', 'poly-crystalline', 2],
        ] as [$name, $slug, $order]) {
            Product::create([
                'category_id' => $pvModule->id,
                'name'        => $name,
                'slug'        => $slug,
                'sort_order'  => $order,
                'is_active'   => true,
            ]);
        }
    }
}