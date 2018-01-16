<?php

namespace seekit;

use Illuminate\Database\Eloquent\Model;

class productRestock extends Model
{
    //model for product restock table;
    protected $table = 'product_restock';
    public function product(){
        return $this->belongsTo('\seekit\product','product_id');
    }
    public function transaction_description(){
        return $this->hasMany('\seekit\transact_desc');
    } 
}
