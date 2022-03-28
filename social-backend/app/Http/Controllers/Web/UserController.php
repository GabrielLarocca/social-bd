<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\UserBloqueado;

class UserController extends Controller {

	public function simpleList(Request $request) {
		$users = User::with('photo');

		$users = $users->select('id', 'usr_name', 'email', 'usr_id_photo')->orderBy('usr_name', 'asc')->get();

		return response()->json($users);
	}

	public function get(Request $request) {
		return response()->json(User::with(['photo'])->where(['id' => $request->user()->id])->firstOrFail());
	}

	public function bloquearUser(Request $request) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'usb_id_bloqueado' => 'required|max:255',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors], 422);
		}

		if ($request->usb_id_bloqueado == $request->user()->id) {
			return response()->json(['errors' => 'Voce não pode se bloquear'], 422);
		}

		$obj = new UserBloqueado;

		$obj->usb_id_bloqueado = $request->usb_id_bloqueado;
		$obj->usb_id_user = $request->user()->id;

		$obj->save();

		return response()->json($obj);
	}

	public function listBloqueados(Request $request) {
		$users = UserBloqueado::with('bloqueado')->get();

		return response()->json($users);
	}
}
