<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GrupoUser extends Model {

	protected $table = "grupo_user";
	protected $fillable = [
		'grs_id_grupo',
		'grs_id_user',
	];

	public function grupo() {
		return $this->belongsTo(Grupo::class, 'grs_id_grupo');
	}

	public function user() {
		return $this->belongsTo(User::class, 'grs_id_user');
	}
}
