<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('people', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('identification',20)->nullable($value = true);
          $table->string('name',50)->nullable($value = true);
          $table->string('lastname',50)->nullable($value = true);
          $table->date('birth_date')->nullable($value = true);
          $table->string('phone_number',20)->nullable($value = true);
          $table->string('mobile_number',20)->nullable($value = true);
          $table->string('home_address',200)->nullable($value = true);
          $table->string('work_address',200)->nullable($value = true);
          $table->string('email',255)->nullable($value = true);
          $table->unsignedInteger('gender_id');
          $table->foreign('gender_id')->references('id')->on('genders')->onDelete('cascade');
          $table->unique(['identification']);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('people');
    }
}