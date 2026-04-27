<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Capability extends Model {
    protected $fillable = ['icon', 'image', 'title', 'title_kurdish', 'description', 'description_kurdish', 'sort_order'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image
            ? rtrim(config('app.url'), '/') . '/storage/' . $this->image
            : null;
    }
}