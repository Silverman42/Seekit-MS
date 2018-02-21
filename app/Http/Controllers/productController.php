<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;
use seekit\Http\Controllers\escapeCharController;

class productController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    } 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $interval = 10;
        $paginator = $request->paginate * 10;

        if($request->ajax()){//Check if request is an AJAX request
            if(!isset($request->searchParam)){
                $products = \seekit\product::with('category')->skip($paginator)->take($interval)->get();
                return response()->json($products);
            }
            else {
                $searchParam = $request->searchParam;
                $products  = \seekit\product::whereHas('category',function($query) use ( $searchParam ){ $query->where('categoryName','LIKE',"%$searchParam%");})->orWhere('productName','LIKE',"%$searchParam%")->with('category')->skip($paginator)->take($interval)->get();
                return response()->json($products);
            }
        }
        else{
            //fetch all products from products table
            return view('product.index');
        }
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //fetch all categories from category table
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $requests)
    {   $mod_product = escapeCharController::escape($requests['productName']);
        $products = \seekit\product::where('productName',$mod_product)
                                    ->pluck('productName');
        if (count($products->toArray())>0) {
            # To check if product name already exist on database
            $err = "Product Name already exist";
            echo $err;
            exit;
        }
        elseif(!is_numeric($requests['productCategory'])){
            return response('Category Not Selected');
        }
        foreach ($requests as $request) {
            if(($request == 'productQuantity' && is_nan($request)) || ($request == 'productPrice' && is_nan($request))){
                # To check of price and quantity input is 
                $err = "Quantity or price Input is not a number";
                echo $err;
                exit;
            }
        }
        # Create product if all conditions above are false
       //continue;
        $product = new \seekit\product;
        $product->productName = strip_tags($requests['productName']);
        $product->category_id = strip_tags($requests['productCategory']);
        $product->product_desc = strip_tags($requests['productDesc']);
        $product->save();   
        $success = "Product created";
        return response($success);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //get the product
        $product = \seekit\product::find($id);
        $previous_page = url()->previous();

        //get all category
        $categories = \seekit\category::all();
        //show the view and pass the product to it
        return view('product.edit')->with('product',$product)->with('categories',$categories)->with('prev_page',$previous_page);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $requests, $id)
    {
        $products = \seekit\product::where('productName',$requests['productName'])
                                    ->pluck('productName');
        if (count($products->toArray())>1) {
            # To check if product name already exist on database more than once
            $err = "Product Name already exist, try Again";
            return response()->json($err);
        }
        # Update product if all conditions above are false
        $productName = strip_tags($requests['productName']);
        $categoryId = strip_tags($requests['productCategory']);
        $productDesc = strip_tags($requests['productDesc']);
        $product = \seekit\product::where("id",$id)
                                    ->update(array("productName"=>$productName,"category_id"=>$categoryId,"product_desc"=>$productDesc));
   
        $success = "Product details updated";
        return response()->json($success);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //soft delete a product 
        $product = \seekit\product::find($id)->delete();
        return redirect()->back();
    }
}
