<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ── Stories (Our Story section in AboutPage) ───────────────────────────
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_kurdish')->nullable();
            $table->text('description');
            $table->text('description_kurdish')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ── Capabilities (What We Do section) ─────────────────────────────────
        Schema::create('capabilities', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->nullable();       // CSS icon class e.g. "fa fa-code"
            $table->string('title');
            $table->string('title_kurdish')->nullable();
            $table->text('description');
            $table->text('description_kurdish')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // ── Milestones (Our Journey timeline) ─────────────────────────────────
        Schema::create('milestones', function (Blueprint $table) {
            $table->id();
            $table->year('year');
            $table->string('title');
            $table->string('title_kurdish')->nullable();
            $table->text('description');
            $table->text('description_kurdish')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('milestones');
        Schema::dropIfExists('capabilities');
        Schema::dropIfExists('stories');
    }
};