<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateProductRestockTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transaction_description', function (Blueprint $table) {
            //
            $table->integer('product_restock_id',false)->default(0)->unsigned();
            $table->foreign('product_restock_id')->references('id')->on('product_restock');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transaction_description', function (Blueprint $table) {
            //
            $table->dropForeign('transaction_description_product_restock_id_foreign');
            $table->dropColumn('product_restock_id');
        });
    }
}
