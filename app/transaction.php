<?php

namespace seekit;

use Illuminate\Database\Eloquent\Model;

class transaction extends Model
{
    //
    public $table = "transaction";
    //protected $timestamps = true;
    public function transaction_description(){
        return $this->hasMany('\seekit\transact_desc');
    }
}
