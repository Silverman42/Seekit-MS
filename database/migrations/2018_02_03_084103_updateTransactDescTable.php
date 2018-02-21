<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTransactDescTable extends Migration
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
            $table->integer('batch_profit',false)->nullable();
            $table->integer('batch_loss',false)->nullable();
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
            $table->dropColumn(['batch_profit','batch_loss']);
        });
    }
}
