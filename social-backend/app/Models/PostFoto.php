<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostFoto extends Model {

	protected $table = "post_fotos";
	protected $fillable = [
		'pof_id_post',
		'pof_id_foto',
	];

	public function post() {
		return $this->belongsTo(Post::class, 'pof_id_post');
	}

	public function foto() {
		return $this->belongsTo(File::class, 'pof_id_foto');
	}
}
