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
Route::get('/categories', [CategoryController::class, 'index'])->name('categories');
Route::prefix('products')->name('products.')->group(function () {
    Route::get('/',       [ProductController::class, 'index'])->name('index');
    Route::get('/{slug}', [ProductController::class, 'show'])->name('show');
});

// ── Admin ─────────────────────────────────────────────────────────────────────
// TODO: wrap in auth middleware when admin panel is built
// ->middleware(['auth', 'verified'])

// Route::prefix('admin')->name('admin.')->group(function () {

//     // ── Categories ──────────────────────────────────────────────────────────
//     Route::prefix('categories')->name('categories.')->group(function () {
//         Route::get('/', [CategoryController::class, 'index'])->name('index');

//         // Root categories
//         Route::post('/',               [CategoryController::class, 'storeRoot'])  ->name('store');
//         Route::put('/{category}',      [CategoryController::class, 'updateRoot']) ->name('update');
//         Route::delete('/{category}',   [CategoryController::class, 'destroyRoot'])->name('destroy');

//         // Sub-categories  (nested under /admin/categories/subs/*)
//         Route::prefix('subs')->name('subs.')->group(function () {
//             Route::post('/',             [CategoryController::class, 'storeSub'])  ->name('store');
//             Route::put('/{category}',    [CategoryController::class, 'updateSub']) ->name('update');
//             Route::delete('/{category}', [CategoryController::class, 'destroySub'])->name('destroy');
//         });
//     });

//     // ── Products ─────────────────────────────────────────────────────────────
//     Route::prefix('products')->name('products.')->group(function () {
//         Route::get('/',               [ProductController::class, 'adminIndex'])  ->name('index');
//         Route::get('/create',         [ProductController::class, 'adminCreate']) ->name('create');
//         Route::post('/',              [ProductController::class, 'adminStore'])  ->name('store');
//         Route::get('/{product}/edit', [ProductController::class, 'adminEdit'])   ->name('edit');
//         Route::put('/{product}',      [ProductController::class, 'adminUpdate']) ->name('update');
//         Route::delete('/{product}',   [ProductController::class, 'adminDestroy'])->name('destroy');
//     });
// });