<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGruposUsersTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('grupos_users', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('grs_id_grupo');
			$table->unsignedBigInteger('grs_id_user');
			$table->timestamps();

			$table->foreign('grs_id_grupo')->references('id')->on('grupo');
			$table->foreign('grs_id_user')->references('id')->on('users');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('grupos_users');
	}
}
