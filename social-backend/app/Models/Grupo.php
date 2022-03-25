<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model {

	protected $table = "grupo";
	protected $fillable = [
		'gru_nome',
		'gru_descricao',
	];

	public function users() {
		return $this->hasMany(GrupoUsers::class, 'grs_id_grupo');
	}
}
