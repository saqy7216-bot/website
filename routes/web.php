<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CaseStudiesController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// ── Public ────────────────────────────────────────────────────────────────────

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/contacts', [ContactsController::class, 'index'])->name('contacts');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/case-studies', [CaseStudiesController::class, 'index'])->name('case-studies');

// /categories is kept for backwards-compatibility (links, nav) but
// redirects to /products — CategoriesPage.jsx has been removed.
Route::get('/categories', [CategoryController::class, 'index'])->name('categories');

Route::prefix('products')->name('products.')->group(function () {
    Route::get('/',       [ProductController::class, 'index'])->name('index');
    Route::get('/{slug}', [ProductController::class, 'show'])->name('show');
});

Route::post('/sendContacts', [ContactsController::class, 'sendMessage'])->name('contacts.send');