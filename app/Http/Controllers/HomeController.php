<?php

namespace App\Http\Controllers;

use App\Models\Capability;
use App\Models\CaseStudy;
use App\Models\Category;
use App\Models\Home;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home/Index', [
            'categories' => Category::tree(),
            'capabilities' => Capability::orderBy('sort_order')->take(3)->get(),
            'caseStudies' => CaseStudy::where('is_published', true)->take(3)->get(),
            "homes" => Home::take(6)->get(),
        ]);
    }
}
