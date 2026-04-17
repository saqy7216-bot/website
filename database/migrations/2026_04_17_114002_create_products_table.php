<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Products table.
     * category_id can point to ANY level of the categories tree (root, sub, or sub-sub).
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // Belongs to any category node (nullable so product can exist uncategorised)
            $table->foreignId('category_id')
                  ->nullable()
                  ->constrained('categories')
                  ->nullOnDelete();

            // ── Core fields ───────────────────────────────────────────────────
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('model_number')->nullable();        // e.g. RZE-ON10-S

            // ── Images ───────────────────────────────────────────────────────
            $table->string('image')->nullable();               // card thumbnail
            $table->string('hero_image')->nullable();          // large banner image on detail page
            $table->string('overview_image')->nullable();      // overview section image

            // ── Text content ─────────────────────────────────────────────────
            $table->text('short_description')->nullable();     // card excerpt
            $table->longText('description')->nullable();       // main description
            $table->text('overview')->nullable();              // overview tab long text

            // ── Structured JSON fields ────────────────────────────────────────
            /**
             * specs — key metrics displayed in the dark specs bar
             * Shape: [{"label":"Rated Output","value":"10000W"}, …]
             */
            $table->json('specs')->nullable();

            /**
             * features — bullet list in "Key Features" tab
             * Shape: ["Dual MPPT solar input", "High efficiency up to 97.6%", …]
             */
            $table->json('features')->nullable();

            /**
             * highlights — short bullet points shown in the hero panel
             * Shape: ["Single-phase grid-connected solar inverter.", …]
             */
            $table->json('highlights')->nullable();

            /**
             * downloads — datasheets / manuals
             * Shape: [{"label":"Datasheet","url":"/storage/docs/product.pdf"}, …]
             */
            $table->json('downloads')->nullable();

            // ── Flags & ordering ─────────────────────────────────────────────
            $table->decimal('price', 12, 2)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};