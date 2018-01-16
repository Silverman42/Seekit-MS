<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateRestockTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('product_restock', function (Blueprint $table) {
            $table->integer('price',false)->default(0);
            $table->string('batch_id',22)->default(0);
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
            $table->dropColumn(['price','batch_id']);
        });
    }
}
