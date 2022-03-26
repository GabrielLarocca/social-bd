<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller {

	public function store(Request $request) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'pos_texto' => 'required|max:255',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors], 422);
		}

		$obj = new Post;

		$obj->pos_texto = $request->pos_texto;
		$obj->pos_id_user = $request->user()->id;

		if ($request->post_id_grupo) {
			$obj->post_id_grupo = $request->post_id_grupo;
		}

		$obj->save();

		return response()->json($obj);
	}

	public function update(Request $request, $id) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'pos_texto' => 'required|max:255',
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors], 422);
		}

		$obj = Post::where(['pos_id_user' => $request->user()->id, 'id' => $id])->firstOrFail();

		$obj->pos_texto = $request->pos_texto;

		$obj->save();

		return response()->json($obj);
	}

	public function list(Request $request) {
		$posts = Post::orderBy('created_at', 'desc');

		$posts = $posts->get();

		return response()->json($posts);
	}

	public function listMy(Request $request) {
		$posts = Post::where(['pos_id_user' => $request->user()->id])->orderBy('created_at', 'desc');

		$posts = $posts->get();

		return response()->json($posts);
	}

	public function get(Request $request, $id) {
		return response()->json(Post::where(["id" => $id])->firstOrFail());
	}

	public function delete(Request $request, $id) {
		$post = Post::where(['pos_id_user' => $request->user()->id, 'id' => $id])->firstOrFail();
		$post->delete();

		return response(null, 200);
	}
}
