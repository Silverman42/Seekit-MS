<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;

class categoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //fetch all categories from category table
        $categories = \seekit\category::get();
        return view('category.index')->with('categories',$categories);
    }

    /**
     * Show the form for creating a new resource.
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
        $categories = \seekit\category::where('categoryName',$request['name'])
                ->pluck('categoryName');
        if (count($categories->toArray())>0) {
            # To check if product name already exist on database
            $err = "Category ".$request['name']." already exist";
            echo $err;
            exit;
        }
        elseif (empty($request['name'])) {
            # To Check if request is empty
            $err = "Input is empty";
            echo $err;
            exit;
        }
        //create new category
        $input = new \seekit\category;
        $input->categoryName = $request['name'];
        $input->save();
        $success = "Category created" ;
        echo $success;
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
            echo $err;
            exit;
        }
        elseif (empty($category)) {
            # To Check if request is empty
            $err = "Input is empty";
            echo $err;
            exit;
        }
        $updateCategory = \seekit\category::where('id',$id)
                            ->update(array('categoryName'=>$category));
            $success = "Category Update successful";
            echo $success;
            exit;
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
