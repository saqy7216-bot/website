<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Capability;
use App\Models\Milestone;
use App\Models\Story;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('About/AboutPage', [
            'categories' => Category::tree(),

            'stories' => Story::orderBy('sort_order')->get(),

            'capabilities' => Capability::orderBy('sort_order')->get(),

            'milestones' => Milestone::orderBy('year')->get(),
        ]);
    }
}