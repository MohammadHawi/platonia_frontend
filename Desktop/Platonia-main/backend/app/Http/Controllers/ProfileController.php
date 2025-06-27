<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    /**
     * Edit user profile
     */
    public function editProfile(Request $request)
    {
        try {
            $this->validate($request, [
                'id' => 'required|exists:users,id',
                'name' => 'required|string|max:255',
                'age' => 'required|integer|min:13|max:120',
                'gender' => 'required|in:Male,Female,Other',
                'interests' => 'nullable|string|max:500'
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }

        $user = User::find($request->id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $oldName = $user->name;

        $user->update([
            'name' => $request->name,
            'age' => $request->age,
            'gender' => $request->gender,
            'interests' => $request->interests ?? ''
        ]);

        // Update planner name in events if name changed
        if ($oldName !== $request->name) {
            Event::where('planner_name', $oldName)->update([
                'planner_name' => $request->name
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $user->fresh()
        ]);
    }
}
