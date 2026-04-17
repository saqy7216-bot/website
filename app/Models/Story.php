<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Story extends Model {
    protected $fillable = ['title','title_kurdish','description','description_kurdish','sort_order'];
}