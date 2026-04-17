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
        return Inertia::render('CaseStudies/Index', [
            // Full category tree for the navbar mega menu
            'categories' => Category::tree(),

            // All published case studies ordered by sort_order
            // CaseStudiesPage.jsx uses: id, title, description, tags, gradient, link, category
            'caseStudies' => CaseStudy::where('is_published', true)
                ->orderBy('sort_order')
                ->get([
                    'id',
                    'title',
                    'category',
                    'description',
                    'tags',       // JSON array: ["React", "Laravel", …]
                    'gradient',   // e.g. "linear-gradient(135deg, #0ea5e9, #0369a1)"
                    'link',       // nullable — external URL shown as "Visit Website"
                    'sort_order',
                ]),
        ]);
    }
}