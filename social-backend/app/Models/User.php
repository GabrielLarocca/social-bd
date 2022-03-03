<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {

	use HasApiTokens, HasFactory, Notifiable;

	protected $table = "users";
	protected $fillable = [
		'usr_name',
		'email',
		'usr_phone',
		'password',
		'usr_id_photo',
		'usr_type',
		'usr_push_token',
		'usr_first_use',
		'usr_active',
	];
	protected $hidden = [
		'password',
		'remember_token',
	];

	public function photo() {
		return $this->belongsTo(File::class, 'usr_id_photo');
	}
}
