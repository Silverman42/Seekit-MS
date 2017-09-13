<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('sqlite')->create('product', function (Blueprint $product) {
                $product->increments('id');
                $product->string('productName',255);
                $product->integer('categoryId', false);
                $product->integer('price', false);
                $product->integer('quantity',false);
                $product->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('sqlite')->dropIfExists('product');
    }
}
