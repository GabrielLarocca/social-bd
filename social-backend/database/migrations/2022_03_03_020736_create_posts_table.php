<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('posts', function (Blueprint $table) {
			$table->id();
			$table->string('pos_texto');
			$table->unsignedBigInteger('pos_id_grupo')->nullable();
			$table->unsignedBigInteger('pos_id_user');
			$table->timestamps();

			$table->foreign('pos_id_grupo')->references('id')->on('grupo');
			$table->foreign('pos_id_user')->references('id')->on('users');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('posts');
	}
}
