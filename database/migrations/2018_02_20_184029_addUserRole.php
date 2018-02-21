<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserRole extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('role', function (Blueprint $table) {
            $table->increments('id');
            $table->string('role_name');
            //
        });
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name','username');
        });
        Schema::table('users', function(Blueprint $table) {
            $table->integer('role_id',false)->unsigned()->nullable();
            $table->foreign('role_id')->references('id')->on('role');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('role');
        Schema::table('users', function($table) {
            //
            $table->dropForeign('user_role_id_foreign');
            $table->dropColumn('role_id');
        });
        Schema::table('users', function($table) {
            //
            $table->renameColumn('username','name');
        });
    }
}
