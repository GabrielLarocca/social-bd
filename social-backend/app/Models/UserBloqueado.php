<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBloqueado extends Model {

	protected $table = "users_bloqueados";
	protected $fillable = [
		'usb_id_user',
		'usb_id_bloqueado',
	];

	public function user() {
		return $this->belongsTo(User::class, 'usb_id_user');
	}

	public function bloqueado() {
		return $this->belongsTo(User::class, 'usb_id_bloqueado');
	}
}
