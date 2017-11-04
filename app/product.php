<?php

namespace seekit;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class product extends Model
{
    use SoftDeletes;
    //
    protected $table = 'product';
    protected $dates = ['deleted_at'];
    public function category(){
        return $this->belongsTo('seekit\category','categoryId');
    }
    public function transaction_description(){
        return $this->hasMany('seekit\transact_desc');
    }
}
