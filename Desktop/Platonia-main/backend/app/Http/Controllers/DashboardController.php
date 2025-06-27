<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\UserEvent;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DashboardController extends Controller
{
    /**
     * Get dashboard data for a user
     */
    public function dashboard(Request $request)
    {
        try {
            $this->validate($request, [
                'user_id' => 'required|exists:users,id'
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }

        $user = \App\Models\User::find($request->user_id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Count total members across all user's events
        $totalMembers = UserEvent::whereHas('event', function ($query) use ($request) {
            $query->where('user_id', $request->user_id);
        })->count();

        // Count events created by user
        $totalEvents = Event::where('user_id', $request->user_id)->count();

        // Get top 3 events by attendance
        $topEvents = Event::withCount('userEvents')
            ->where('user_id', $request->user_id)
            ->orderByDesc('user_events_count')
            ->limit(3)
            ->get();

        // Get upcoming events the user is attending
        $upcomingEvents = $user->attendingEvents()
            ->where('event_date', '>=', now()->toDateString())
            ->orderBy('event_date')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'dashboard_data' => [
                'total_members' => $totalMembers,
                'total_events_created' => $totalEvents,
                'top_events' => $topEvents,
                'upcoming_events' => $upcomingEvents
            ]
        ]);
    }
}
