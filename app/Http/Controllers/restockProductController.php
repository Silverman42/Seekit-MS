<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use seekit\Http\Controllers\escapeCharController;

class restockProductController extends Controller
{
    // Create new product batch for restock
    public function store(Request $request){
        
        if($request->ajax()){
            $expiry = null;
            if(!empty($request->expiry_date)){
                $expiry = $request->expiry_date;
            }
            $restockProduct = new \seekit\productRestock;
            $restockProduct->batch_id = 'batch_'.rand(000,999).rand(000,999);
            $restockProduct->vendor = escapeCharController::escape($request->vendor);
            $restockProduct->product_id = $request->product_id;
            $restockProduct->price = $request->price;
            $restockProduct->expiry = $expiry;
            $restockProduct->quantity = $request->quantity;
            $restockProduct->save();
        }
        return response("Restock successfull", 200);
    }
    //View all restock batch from DB
    public function view(Request $request){
        $paginator = $request->page;
        if(empty($request->searchInput)){
            $restock_batch_list = \seekit\productRestock::where('product_id',$request->id)->skip($paginator)->take(10)->get();
            return response()->json($restock_batch_list);
        }
        else{
            $restock_batch_list = \seekit\productRestock::where('batch_id','LIKE',"%$request->searchInput%")
            ->orWhere('expiry','LIKE',"%$request->searchInput%")
            ->orWhere('Vendor','LIKE',"%$request->searchInput%")
            ->orWhere('quantity','LIKE',"%$request->searchInput%")
            ->skip($paginator)->take(10)->orderBy('created_at','desc')->get();
            return response()->json($restock_batch_list);
        }
        


    }
}
