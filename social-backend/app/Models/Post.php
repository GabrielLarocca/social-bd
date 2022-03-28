<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model {

	protected $table = "posts";
	protected $fillable = [
		'pos_texto',
		'pos_id_grupo',
		'pos_id_user',
	];

	public function grupo() {
		return $this->belongsTo(Grupo::class, 'pos_id_grupo');
	}

	public function user() {
		return $this->belongsTo(User::class, 'pos_id_user');
	}
}
