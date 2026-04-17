<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Capability extends Model {
    protected $fillable = ['icon','title','title_kurdish','description','description_kurdish','sort_order'];
}