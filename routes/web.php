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
Route::get('transaction/', function () {
    return view('transaction.transactions');
});
Route::get('transaction/description', function () {
    return view('transaction.description');
});
Route::resource('product', 'productController' );
Route::get('new-category', function () {
    return view('new-category');
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
