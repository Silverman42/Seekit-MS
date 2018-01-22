<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductRestocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_restock', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('product_id',false)->unsigned();
            $table->integer('quantity',false);
            $table->date('expiry')->nullable();
            $table->string('Vendor',255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_restock');
    }
}
