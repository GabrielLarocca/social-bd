<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostFotosTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('post_fotos', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('pof_id_post');
			$table->unsignedBigInteger('pof_id_foto');
			$table->timestamps();

			$table->foreign('pof_id_post')->references('id')->on('posts');
			$table->foreign('pof_id_foto')->references('id')->on('files');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('post_fotos');
	}
}
