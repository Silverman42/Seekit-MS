<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::resource('transaction', 'transactionController');
Route::resource('product', 'productController' );
Route::get('new-category', function () {
    //fetch all categories from category table
    $categories = \seekit\category::all();
    return view('new-category')->with('categories',$categories);
});
Route::post('category/create', function () {
    //create new category
    $category = Request::all();
    $input = new \seekit\category ;
    $input->categoryName = $category['name'];
    $input->save();
    return redirect('new-category');
});
Route::get('admin', function () {
    return view('admin');
});
Route::get('users/id', function () {
    return URL::to('new/link',['picture','small'],true);
});
Route::get('customer-purchase', function () {
    return view('customer-purchase');
});
