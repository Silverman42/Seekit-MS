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
            $table->integer('product_restock_id',false)->foreign()->references('id')->on('product_restock')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('product_restock', function (Blueprint $table) {
            //
            $table->dropColumn('product_restock_id');
        });
    }
}
