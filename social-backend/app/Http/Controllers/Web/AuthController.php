<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Notifications\PasswordResetNotificationApp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Notification;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

use Illuminate\Support\Facades\Log;

class AuthController extends Controller {

	private function authenticateUser($user) {
		$token = $user->createToken('user', ['api:web'])->plainTextToken;

		return response()->json(['user' => $user, 'token' => $token]);
	}

	public function auth(Request $request) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'email' => 'required|email',
			'password' => 'required'
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors]);
		}

		$user = User::where(['email' => $request->email, 'usr_active' => 1])->with('photo')->first();

		if (!$user || !Hash::check($request->password, $user->password)) {
			return response()->json(['errors' => ['The provided credentials are incorrect.']], 401);
		}

		return $this->authenticateUser($user);
	}

	public function register(Request $request) {
		$this->validate($request, [
			'email' => 'required|email|unique:users',
			'password' => 'required|min:6',
			'usr_name' => 'required',
			'usr_telefone' => 'required',
			'usr_sexo' => 'required',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors]);
		}


		$obj = new User;

		$obj->email = $request->email;
		$obj->password = bcrypt($request->password);
		$obj->usr_name = $request->usr_name;
		$obj->usr_telefone = $request->usr_telefone;
		$obj->usr_sexo = $request->usr_sexo;

		$obj->save();

		return $this->authenticateUser($obj);
	}
}
