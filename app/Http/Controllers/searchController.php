<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;

class searchController extends Controller
{
    //Search products in Product table for use in transaction.
    public function transactionSearch(Request $request){
        if (!empty($request->input('searchItem'))) {
            $searchItem = $request->input('searchItem');
            $searchItem = strip_tags($searchItem);
            $search = \seekit\product::where('productName','LIKE',"%$searchItem%")->get();
            echo $search->toJson(); 
        }
    }
    public function productSearch(){
        
    }
}
