<?php

namespace seekit;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class category extends Model
{
    use SoftDeletes;
    //
    protected $table = 'category';
    protected $dates = ['deleted'];
    public function products(){
        return $this->hasMany('\seekit\product','categoryId');
    }
}
