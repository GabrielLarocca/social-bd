<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('users', function (Blueprint $table) {
			$table->id();
			$table->string('usr_name');
			$table->string('usr_telefone');
			$table->string('usr_sexo');
			$table->string('email')->unique();
			$table->string('password');
			$table->unsignedBigInteger('usr_id_photo')->nullable();
			$table->boolean('usr_active')->default('1');
			$table->rememberToken();
			$table->timestamps();

			$table->foreign('usr_id_photo')->references('id')->on('files');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('users');
	}
}
