<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;

class productController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //fetch all products from products table
        $products = \seekit\product::simplePaginate(4);
        return view('product.index')->with('products',$products);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //fetch all categories from category table
        $categories = \seekit\category::get();
        return view('product.create')->with('categories',$categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $requests)
    {
        $products = \seekit\product::where('productName',$requests['productName'])
                                    ->pluck('productName');
        if (count($products->toArray())>0) {
            # To check if product name already exist on database
            $err = "Product Name already exist";
            echo $err;
            exit;
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
        $product->categoryId = strip_tags($requests['productCategory']);
        $product->price = strip_tags($requests['productPrice']);
        $product->quantity = strip_tags($requests['productQuantity']);
        $product->save();   
        $success = "Product created";
        echo $success;
        exit;
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

        //get all category
        $categories = \seekit\category::all();
        //show the view and pass the product to it
        return view('product.edit')->with('product',$product)->with('categories',$categories);
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
            $err = "Product Name already exist";
            echo $err;
            exit;
        }
        foreach ($requests as $request) {
            if(($request == 'productQuantity' && is_nan($request)) || ($request == 'productPrice' && is_nan($request))){
                # To check if price and quantity inputs are numbers 
                $err = "Quantity or price Input is not a number";
                echo $err;
                exit;
            }
        }
        # Update product if all conditions above are false
        $productName = strip_tags($requests['productName']);
        $categoryId = strip_tags($requests['productCategory']);
        $price = strip_tags($requests['productPrice']);
        $quantity = strip_tags($requests['productQuantity']);
        $product = \seekit\product::where("id",$id)
                                    ->update(array("productName"=>$productName,"categoryId"=>$categoryId,"price"=>$price,"quantity"=>$quantity));
   
        $success = "Product details updated";
        echo $success;
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
