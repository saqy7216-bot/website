<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CaseStudy;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudiesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('CaseStudies/CaseStudiesPage', [
            // Full category tree for the navbar mega menu
            'categories' => Category::tree(),

            // All published case studies ordered by sort_order
            // CaseStudiesPage.jsx uses: id, title, description, tags, gradient, link, category
            'caseStudies' => CaseStudy::where('is_published', true)
                ->get(),
        ]);
    }
}