<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class restockProductController extends Controller
{
    //
    public function store(Request $request){
        
        if($request->ajax()){
            $expiry = null;
            if(!empty($request->expiry_date)){
                $expiry = $request->expiry_date;
            }
            $restockProduct = new \seekit\productRestock;
            $restockProduct->batch_id = 'batch_'.rand(000,999).rand(000,999);
            $restockProduct->vendor = $request->vendor;
            $restockProduct->product_id = $request->product_id;
            $restockProduct->price = $request->price;
            $restockProduct->expiry = $expiry;
            $restockProduct->quantity = $request->quantity;
            $restockProduct->product_id = $request->product_id;
            $restockProduct->save();
        }
        return response("Restock successfull", 200);
    }
}
