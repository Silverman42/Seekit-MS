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
    $products = \seekit\product::get(['productName','price','quantity']);
    return response()->json($products);
});
Route::get('search/transaction', 'searchController@transactionSearch');
Route::post('search/transproduct', 'searchController@transProductSearch');
Route::get('search/product', 'searchController@productSearch');
Route::get('admin', function () {
    return view('admin');
});
Route::get('users/id', function () {
    return URL::to('new/link',['picture','small'],true);
});
Route::get('customer-purchase', function () {
    return view('customer-purchase');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
