<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    protected $fillable = [
        "section_number",
        "title",
        "title_kurdish",
        "sub_title",
        "sub_title_kurdish",
        "number_1",
        "number_2",
        "number_3",
    ];
}
