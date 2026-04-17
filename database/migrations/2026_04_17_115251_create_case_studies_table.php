<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ── Case Studies ───────────────────────────────────────────────────────
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->nullable();    // used for filter pills: "FinTech", "HealthTech" …
            $table->text('description')->nullable();
            $table->json('tags')->nullable();           // ["React", "Laravel", …]
            $table->string('gradient')->nullable();     // CSS gradient string for card bg
            $table->string('link')->nullable();         // external URL, nullable
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ── Contact Messages ───────────────────────────────────────────────────
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('case_studies');
    }
};