<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\Contacts;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contacts/ContactsPage', [
            'categories' => Category::tree(),
        ]);
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        Contacts::create([
            ...$validated,
            'is_read' => false,
        ]);

        return back()->with('success', 'Your message has been sent. We will get back to you shortly.');
    }
}
