<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Helpers\S3Util;

class File extends Model {

	protected $table = "files";
	protected $fillable = [
		'fil_name',
		'fil_size'
	];
	public $appends = ['url'];

	public function getUrlAttribute() {
		return S3Util::getObject($this->fil_name);
	}
}
