<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Validator;

use App\Models\Grupo;
use App\Models\GrupoUsers;
use Illuminate\Support\Facades\Log;

class GrupoController extends Controller {

	public function store(Request $request) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'gru_nome' => 'required|max:255',
			'gru_descricao' => 'required|max:255',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors], 422);
		}

		$obj = new Grupo;

		$obj->gru_nome = $request->gru_nome;
		$obj->gru_descricao = $request->gru_descricao;

		$obj->save();

		return response()->json($obj);
	}

	public function update(Request $request, $id) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'gru_nome' => 'required|max:255',
			'gru_descricao' => 'required|max:255',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors], 422);
		}

		$obj = Grupo::where(['id' => $id])->firstOrFail();

		$obj->gru_nome = $request->gru_nome;
		$obj->gru_descricao = $request->gru_descricao;

		$obj->save();

		return response()->json($obj);
	}

	public function simpleList(Request $request) {
		$grupo = Grupo::orderBy('created_at', 'desc');

		if (!empty($request->filter)) {
			$grupo->where(function ($q) use ($request) {
				$q->orWhere('gru_nome', 'LIKE', '%' . $request->filter . '%');
			});
		}

		$grupo = $grupo->get();

		return response()->json($grupo);
	}

	public function participarGrupo(Request $request) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'grs_id_grupo' => 'required|max:255',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors], 422);
		}

		$obj = new GrupoUsers;

		$obj->grs_id_grupo = $request->grs_id_grupo;
		$obj->grs_id_user = $request->user()->id;

		$obj->save();

		return response()->json($obj);
	}

	public function removerDoGrupo(Request $request, $groupId, $userId) {
		$errors = array();

		$grupoUser = GrupoUsers::where(['grs_id_user' => $userId, 'grs_id_grupo' => $groupId])->firstOrFail();
		$grupoUser->delete();

		return response(null, 200);
	}

	public function get(Request $request, $id) {
		return response()->json(Grupo::where(["id" => $id])->firstOrFail());
	}

	public function participantes(Request $request, $id) {
		$grupo = GrupoUsers::orderBy('created_at', 'desc')->where(['grs_id_user' => $request->user()->id])->with('user')->get();

		return response()->json($grupo);
	}

	public function delete(Request $request, $id) {
		$post = Grupo::where(['id' => $id])->firstOrFail();
		$post->delete();

		return response(null, 200);
	}
}
