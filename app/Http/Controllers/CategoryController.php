<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Categories/Index', [
            'tree' => Category::tree(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Form', [
            // Flat list for the parent dropdown (exclude current, show name + depth indent)
            'allCategories' => Category::active()->ordered()->get(['id', 'name', 'depth', 'parent_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());

        $validated['slug']  = Str::slug($validated['name']);
        $validated['depth'] = $validated['parent_id']
            ? Category::find($validated['parent_id'])->depth + 1
            : 0;

        Category::create($validated);

        return redirect()->route('admin.categories.index')
                         ->with('success', 'Category created.');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Form', [
            'category'      => $category,
            'allCategories' => Category::active()
                ->ordered()
                ->where('id', '!=', $category->id)
                ->get(['id', 'name', 'depth', 'parent_id']),
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate($this->rules());

        $validated['depth'] = $validated['parent_id']
            ? Category::find($validated['parent_id'])->depth + 1
            : 0;

        $category->update($validated);

        return redirect()->route('admin.categories.index')
                         ->with('success', 'Category updated.');
    }

    public function destroy(Category $category)
    {
        // Prevent deleting a category that still has products
        if ($category->products()->exists()) {
            return back()->with('error', 'Cannot delete — category has products assigned to it.');
        }

        $category->delete();

        return redirect()->route('admin.categories.index')
                         ->with('success', 'Category deleted.');
    }

    private function rules(): array
    {
        return [
            'parent_id'   => 'nullable|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:100',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ];
    }
}