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
Route::resource('category','categoryController');
Route::get('users/', function () {
    $products = \seekit\product::all();
    var_dump(count($products));
    $products->each(function($product){
        var_dump($product->productName);
    });
});
Route::post('search/transaction', 'searchController@transactionSearch');
Route::post('search/product', 'searchController@productSearch');
Route::get('admin', function () {
    return view('admin');
});
Route::get('users/id', function () {
    return URL::to('new/link',['picture','small'],true);
});
Route::get('customer-purchase', function () {
    return view('customer-purchase');
});
