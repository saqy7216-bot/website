<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CaseStudy extends Model {
    protected $fillable = ['title','title_kurdish','category','description','description_kurdish','tags','gradient','link','is_published','sort_order'];
    protected $casts = ['tags' => 'array', 'is_published' => 'boolean'];
}