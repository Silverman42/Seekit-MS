<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;
use seekit\Http\Controllers\escapeCharController;

class categoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //for ajax requests
        
        $interval = 10;
        $page = $request->paginate * $interval;
        if($request->ajax()){
            if(!isset($request->searchParam)){
                $categories = \seekit\category::skip($page)->take($interval)->orderBy('created_at','desc')->get();   
                return response()->json($categories);
            }
            else{
                # code...
                $categories = \seekit\category::where('categoryName','LIKE',"%$request->searchParam%")->skip($page)->take($interval)->orderBy('created_at','desc')->get();
                return response()->json($categories);
            }
        }
        //fetch all categories from category table
        else{
            //$categories = \seekit\category::get();
            return view('category.index'); //->with('categories',$categories);
        }
    }

    /** Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $mod_request = escapeCharController::escape($request['name']);  //htmlspecialchars(,ENT_COMPAT,'UTF-8'); 
        $categories = \seekit\category::where('categoryName',$mod_request)
                ->pluck('categoryName');
        if (count($categories->toArray())>0) {
            # To check if product name already exist on database
            $err = "Category ".$mod_request." already exist";
            return response()->json($err,200);
        }
        elseif (empty($mod_request)) {
            # To Check if request is empty
            $err = "Input is empty";
            return response()->json($err,201);
        }
        //create new category
        $input = new \seekit\category;
        $input->categoryName = $mod_request;
        $input->save();
        $success = 'Submit successful';
        return response()->json($success,202);
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
        $category = \seekit\category::find($id);
        return view('category.edit')->with('category', $category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = strip_tags($request['categoryName']); 
        //Update category
        $categories = \seekit\category::where('categoryName',$category)
        ->pluck('categoryName');
        if (count($categories->toArray())>0) {
            # To check if product name already exist on database
            $err = "Category ".$request['name']." already exist";
            return response()->json($err);
        }
        elseif (empty($category)) {
            # To Check if request is empty
            $err = "Input is empty";
            return response()->json($err);
        }
        $updateCategory = \seekit\category::where('id',$id)
                            ->update(array('categoryName'=>$category));
            $success = "Category Update successful";
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
        //to delete category
        $deleteCategory = \seekit\category::find($id)->delete();
        return redirect('category/');
    }
}
