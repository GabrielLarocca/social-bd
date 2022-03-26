<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\GrupoController;
use App\Http\Controllers\Web\UserController;
use App\Http\Controllers\Web\PostController;

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */

Route::group(['prefix' => 'web'], function () {
	Route::post('/login', [AuthController::class, 'auth']);
	Route::post('/register', [AuthController::class, 'register']);

	Route::group(['middleware' => ['auth:sanctum', 'user']], function () {
		Route::group(['prefix' => 'user'], function () {
			Route::get('/list', [UserController::class, 'simpleList']);
			Route::get('/bloqueados', [UserController::class, 'listBloqueados']);
			Route::post('/bloquear', [UserController::class, 'bloquearUser']);
		});

		Route::group(['prefix' => 'grupo'], function () {
			Route::post('/list', [GrupoController::class, 'simpleList']);
			Route::post('/', [GrupoController::class, 'store']);
			Route::get('/{id}', [GrupoController::class, 'get']);
			Route::post('/{id}', [GrupoController::class, 'update']);
			Route::delete('/{id}', [GrupoController::class, 'delete']);

			Route::group(['prefix' => 'participantes'], function () {
				Route::get('/{id}', [GrupoController::class, 'participantes']);
				Route::post('/participarGrupo', [GrupoController::class, 'participarGrupo']);
			});
		});

		Route::group(['prefix' => 'post'], function () {
			Route::post('/', [PostController::class, 'store']);
			Route::get('/{id}', [PostController::class, 'get']);
			Route::post('/list', [PostController::class, 'list']); // lista todos posts
			Route::post('/list-me', [PostController::class, 'listMy']); //lista posts do usuario
			Route::post('/{id}', [PostController::class, 'update']);
			Route::delete('/{id}', [PostController::class, 'delete']);
		});
	});
});
