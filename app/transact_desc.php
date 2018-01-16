<?php

namespace seekit;

use Illuminate\Database\Eloquent\Model;

class transact_desc extends Model
{
    //model for transaction_description table
    protected $table = 'transaction_description';
    public function transaction(){
        return $this->belongsTo('\seekit\transaction');
    }
    public function product(){
        return $this->belongsTo('\seekit\product');
    }
    public function product_restock(){
        return $this->belongsTo('\seekit\productRestock');
    }
}
