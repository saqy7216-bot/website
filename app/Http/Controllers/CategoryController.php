<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * The dedicated Categories page has been merged into Products/Index.
     * Redirect all /categories traffic to /products, preserving any
     * ?category= or ?search= query parameters.
     */
    public function index(Request $request)
    {
        $params = array_filter($request->only(['category', 'search']));

        return redirect()->route('products.index', $params);
    }
}