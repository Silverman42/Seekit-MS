<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSelling extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('product_restock', function(Blueprint $table) {
            //
            $table->integer('cost_price',false)->default(0);
            $table->integer('profit',false)->default(0);
            $table->integer('loss',false)->default(0);
        });
        Schema::table('product_restock', function (Blueprint $table) {
            //
            $table->renameColumn('price','selling_price');
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
            $table->renameColumn('selling_price','price');
        });
        Schema::table('product_restock', function(Blueprint $table) {
            $table->dropColumn('profit');
        });
        Schema::table('product_restock', function(Blueprint $table) {
            //
            $table->dropColumn('cost_price');
        });
        Schema::table('product_restock', function(Blueprint $table) {
            //
             $table->dropColumn('loss');
        });
    }
}
