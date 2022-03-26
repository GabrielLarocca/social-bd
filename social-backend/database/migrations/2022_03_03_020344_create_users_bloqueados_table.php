<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersBloqueadosTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('users_bloqueados', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('usb_id_user')->nullable(); //quem bloqueia
			$table->unsignedBigInteger('usb_id_bloqueado')->nullable(); //quem foi bloqueado

			$table->foreign('usb_id_user')->references('id')->on('users');
			$table->foreign('usb_id_bloqueado')->references('id')->on('users');

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('users_bloqueados');
	}
}
