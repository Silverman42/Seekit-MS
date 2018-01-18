<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignToTransDesc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('transaction_description', function (Blueprint $table) {
            $table->foreign('product_id')->references('id')->on('product')->nullable();
            $table->foreign('transaction_id')->references('id')->on('transaction')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('transaction_description',function(Blueprint $table){
            $table->dropForeign('product_id');
            $table->dropForeign('transaction_id');
        });
    }
}
