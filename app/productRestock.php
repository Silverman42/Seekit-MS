<?php

namespace seekit;

use Illuminate\Database\Eloquent\Model;

class productRestock extends Model
{
    //model for product restock table;
    protected $table = 'product_restock';
    public function product(){
        $this-belongsTo('\seekit\product');
    } 
}
