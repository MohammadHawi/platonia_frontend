<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Authentication routes
Route::post('/register', [\App\Http\Controllers\AuthenticationController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\AuthenticationController::class, 'login']);
Route::get('/users/{id}', [\App\Http\Controllers\AuthenticationController::class, 'getUser']);

// Event routes
Route::get('/events', [\App\Http\Controllers\EventController::class, 'showFeed']);
Route::post('/events', [\App\Http\Controllers\EventController::class, 'createEvent']);
Route::get('/events/{id}', [\App\Http\Controllers\EventController::class, 'getEvent']);
Route::post('/events/join', [\App\Http\Controllers\EventController::class, 'joinEvent']);
Route::get('/events/{event_id}/members', [\App\Http\Controllers\EventController::class, 'getEventMembers']);
Route::post('/events/members/remove', [\App\Http\Controllers\EventController::class, 'removeMember']);
Route::post('/events/suggested', [\App\Http\Controllers\EventController::class, 'suggestedEvents']);

// User profile routes
Route::post('/profile/edit', [\App\Http\Controllers\ProfileController::class, 'editProfile']);
Route::get('/users/{user_id}/events', [\App\Http\Controllers\EventController::class, 'getUserEvent']);

// Dashboard routes
Route::post('/dashboard', [\App\Http\Controllers\DashboardController::class, 'dashboard']);

// Legacy routes for backward compatibility
Route::get('/landing', [\App\Http\Controllers\EventController::class, 'showFeed']);
Route::get('/eventView/{id}', [\App\Http\Controllers\EventController::class, 'getEvent']);
Route::get('/userView/{user_id}', [\App\Http\Controllers\EventController::class, 'getUserEvent']);
Route::get('/event-members/{event_id}', [\App\Http\Controllers\EventController::class, 'getEventMembers']);
Route::post('/newEvent', [\App\Http\Controllers\EventController::class, 'createEvent']);
Route::post('/joinEvent', [\App\Http\Controllers\EventController::class, 'joinEvent']);
Route::post('/editProfile', [\App\Http\Controllers\ProfileController::class, 'editProfile']);
Route::post('/suggested-events', [\App\Http\Controllers\EventController::class, 'suggestedEvents']);

// Sanctum authenticated route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
