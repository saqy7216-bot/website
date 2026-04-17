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
        return Inertia::render('About/Index', [
            // Full category tree for the navbar mega menu
            'categories' => Category::tree(),

            // Our Story section — AboutPage reads stories[0].title / .description
            // and their Kurdish equivalents (title_kurdish / description_kurdish)
            'stories' => Story::orderBy('sort_order')->get([
                'id',
                'title',
                'title_kurdish',
                'description',
                'description_kurdish',
                'sort_order',
            ]),

            // What We Do — capability cards with icon, title, description (+ Kurdish)
            'capabilities' => Capability::orderBy('sort_order')->get([
                'id',
                'icon',
                'title',
                'title_kurdish',
                'description',
                'description_kurdish',
                'sort_order',
            ]),

            // Our Journey timeline — each milestone has a year, title, description (+ Kurdish)
            'milestones' => Milestone::orderBy('year')->get([
                'id',
                'year',
                'title',
                'title_kurdish',
                'description',
                'description_kurdish',
            ]),
        ]);
    }
}