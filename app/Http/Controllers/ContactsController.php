<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contacts/Index', [
            'categories' => Category::tree(),
        ]);
    }

 
}
