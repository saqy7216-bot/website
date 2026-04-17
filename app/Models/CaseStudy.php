<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CaseStudy extends Model {
    protected $fillable = ['title','category','description','tags','gradient','link','is_published','sort_order'];
    protected $casts = ['tags' => 'array', 'is_published' => 'boolean'];
}