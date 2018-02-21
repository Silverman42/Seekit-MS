<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class searchController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    } 
    //Search products in Product table for use in transaction.
    public function transProductSearch(Request $request){
        if (!empty($request->input('searchItem'))) {
            $searchItem = $request->input('searchItem');
            if($request->search_param == 1){
                $searchItem = strip_tags($searchItem);
                $search = \seekit\productRestock::whereHas('product',function($query) use ($searchItem){  
                    $query->where("productName","LIKE","%$searchItem%");
                })->orWhere('expiry','=',null)
                ->where('expiry','>=',Carbon::now())
                ->with('product')->take(10)->get();
                return response()->json($search);
            }
            elseif ($request->search_param == 2) {
                $search = \seekit\productRestock::with('product')->where('batch_id','LIKE',"%$searchItem%")->take(10)->get();
                return response()->json($search);
            }
            elseif ($request->search_param == 3) {
                $search = \seekit\productRestock::with('product')->where('vendor','LIKE',"%$searchItem%")->take(10)->get();
                return response()->json($search);
            }
        }
    }
    public function transactionSearch(Request $request){
        if (empty($request['searchTransact']) && ($request['searchParam'] == 1 || $request['searchParam'] == 2)) {
            $counter = $request->input('page') * 10;
            $search = \seekit\transaction::take(10)->skip($counter)->orderBy('created_at','desc')->get();
            return response()->json($search); 
        }
        elseif(!empty($request->input('searchTransact')) && $request->input('searchParam') == 1){
            $searchItem = $request->input('searchTransact');
            $searchItem = strip_tags($searchItem);
            $counter = $request->input('page') * 10;
            $search = \seekit\transaction::where("transaction_name","LIKE","%$searchItem%")->take(10)->skip($counter)->get(['id','transaction_name','total_price','created_at']);
            return response()->json($search); 
        }
        elseif(!empty($request->input('searchTransact')) && $request->input('searchParam') == 2){
            $searchItem = $request->input('searchTransact');
            $searchItem = strip_tags($searchItem);
            $counter = $request->input('page') * 10;
            $search = \seekit\transaction::where("created_at","LIKE","%$searchItem%")->take(10)->skip($counter)->get(['id','transaction_name','total_price','created_at']);
            return response()->json($search); 
        }
    }
    public function productSearch(Request $request){
        if(empty($request->input('searchProduct')) && ($request->input('searchParam') == 1 || $request->input('searchParam') == 2)){
            $counter = $request->input('page') * 10;
            $search = \seekit\product::with('category')->take(10)->skip($counter)->orderBy('created_at','desc')->get();
            return response()->json($search);
        }
        elseif(!empty($request->input('searchProduct')) && $request->input('searchParam') == 1){
            $searchItem = $request->input('searchProduct');
            $searchItem = strip_tags($searchItem);
            $counter = $request->input('page') * 10;
            $search = \seekit\product::where("productName","LIKE","%$searchItem%")->with('category')->take(10)->skip($counter)->orderBy('created_at','desc')->get();
            return response()->json($search);
        }
        elseif(!empty($request->input('searchProduct')) && $request->input('searchParam') == 2){
            $searchItem = $request->input('searchProduct');
            $searchItem = strip_tags($searchItem);
            $counter = $request->input('page') * 10;
            $category = \seekit\category::where("categoryName","LIKE","%$searchItem%")->get(['id']);
            $category_id = array_pluck($category->toArray(), 'id');
            $search = \seekit\product::whereIn('category_id',$category_id)->with('category')->get();
            return response()->json($search);  
        }
    }
}
