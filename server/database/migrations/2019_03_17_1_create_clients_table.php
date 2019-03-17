<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('clients', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('ruc',20)->nullable($value = true);
          $table->unsignedInteger('person_id');
          $table->foreign('person_id')->references('id')->on('people')->onDelete('cascade');
          $table->unsignedInteger('client_type_id');
          $table->foreign('client_type_id')->references('id')->on('client_types')->onDelete('cascade');
          $table->unsignedInteger('establishment_id');
          $table->foreign('establishment_id')->references('id')->on('establishments')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('clients');
    }
}