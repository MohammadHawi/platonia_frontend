<?php

namespace App\Http\Controllers;

use App\Http\Resources\getEventMembers;
use App\Models\Category;
use App\Models\Event;
use App\Models\UserEvent;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class EventController extends Controller
{
    /**
     * Show events feed with optional category filter
     */
    public function showFeed()
    {
        $query = Event::with(['category', 'creator'])->orderBy('id', 'DESC');
        
        if (request('category_id')) {
            $query->where('category_id', request('category_id'));
        }

        $events = $query->get();
        $categories = Category::all();

        if ($events->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'No events found',
                'data' => [],
                'categories' => $categories
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $events,
            'categories' => $categories
        ]);
    }

    /**
     * Create a new event
     */
    public function createEvent(Request $request)
    {
        try {
            $this->validate($request, [
                'planner_name' => 'required|string|max:255',
                'event_topic' => 'required|string|max:255',
                'event_place' => 'required|string|max:255',
                'event_date' => 'required|date|after:today',
                'event_time' => 'required|date_format:H:i',
                'event_capacity' => 'required|integer|min:1|max:10000',
                'event_description' => 'required|string|max:1000',
                'category_id' => 'required|exists:categories,id',
                'user_id' => 'required|exists:users,id'
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }

        $event = Event::create([
            'planner_name' => $request->planner_name,
            'event_topic' => $request->event_topic,
            'event_place' => $request->event_place,
            'event_date' => $request->event_date,
            'event_time' => $request->event_time,
            'event_capacity' => $request->event_capacity,
            'event_description' => $request->event_description,
            'user_id' => $request->user_id,
            'category_id' => $request->category_id
        ]);

        // Automatically add the creator to the event
        UserEvent::create([
            'user_id' => $request->user_id,
            'event_id' => $event->id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event created successfully',
            'event' => $event->load(['category', 'creator'])
        ], 201);
    }

    /**
     * Get event details
     */
    public function getEvent($id)
    {
        $event = Event::with(['category', 'creator'])->find($id);
        
        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'event' => $event,
            'remaining_capacity' => $event->remaining_capacity,
            'current_attendees' => $event->current_attendees_count,
            'is_full' => $event->is_full
        ]);
    }

    /**
     * Get events for a specific user
     */
    public function getUserEvent($user_id)
    {
        $user = \App\Models\User::find($user_id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $events = $user->attendingEvents()
            ->with(['category', 'creator'])
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'success' => true,
            'events' => $events
        ]);
    }

    /**
     * Join an event
     */
    public function joinEvent(Request $request)
    {
        try {
            $this->validate($request, [
                'event_id' => 'required|exists:events,id',
                'user_id' => 'required|exists:users,id'
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }

        $event = Event::find($request->event_id);
        
        if ($event->is_full) {
            return response()->json([
                'success' => false,
                'message' => 'The event capacity is full'
            ], 400);
        }

        $existingParticipation = UserEvent::where('user_id', $request->user_id)
            ->where('event_id', $request->event_id)
            ->first();

        if ($existingParticipation) {
            return response()->json([
                'success' => false,
                'message' => 'You have already joined this event'
            ], 400);
        }

        UserEvent::create([
            'event_id' => $request->event_id,
            'user_id' => $request->user_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Successfully joined the event'
        ]);
    }

    /**
     * Get event members
     */
    public function getEventMembers(Request $request)
    {
        try {
            $this->validate($request, [
                'event_id' => 'required|exists:events,id'
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }

        $event = Event::find($request->event_id);
        
        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        $userEvents = UserEvent::with('user')->where('event_id', $request->event_id)->get();

        return response()->json([
            'success' => true,
            'members' => getEventMembers::collection($userEvents)
        ]);
    }

    /**
     * Remove member from event
     */
    public function removeMember(Request $request)
    {
        try {
            $this->validate($request, [
                'user_id' => 'required|exists:users,id',
                'event_id' => 'required|exists:events,id'
            ]);
        } catch (ValidationException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $exception->errors()
            ], 422);
        }

        $deleted = UserEvent::where('user_id', $request->user_id)
            ->where('event_id', $request->event_id)
            ->delete();

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'User is not a member of this event'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Member removed successfully'
        ]);
    }

    /**
     * Get suggested events based on user's interests and preferences
     */
    public function suggestedEvents(Request $request)
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

        // Get events the user is attending
        $userEvents = $user->attendingEvents()->get();
        
        // Get events the user has created
        $userCreatedEvents = $user->createdEvents()->get();
        
        // Combine all user's event interactions
        $allUserEvents = $userEvents->merge($userCreatedEvents);
        
        $suggestedEvents = collect();
        
        if ($allUserEvents->isNotEmpty()) {
            // Method 1: Based on attended/created events categories
            $categoryCounts = $allUserEvents->groupBy('category_id')
                ->map(function ($events) {
                    return $events->count();
                })
                ->sortByDesc(function ($count) {
                    return $count;
                });

            // Get top 3 categories
            $topCategoryIds = $categoryCounts->keys()->take(3);

            if ($topCategoryIds->isNotEmpty()) {
                $suggestedEvents = Event::with(['category', 'creator'])
                    ->whereIn('category_id', $topCategoryIds)
                    ->whereNotIn('id', $allUserEvents->pluck('id'))
                    ->where('event_date', '>=', now()->toDateString())
                    ->orderBy('event_date')
                    ->limit(10)
                    ->get();
            }
        }
        
        // Method 2: If no suggestions from attended events, use user interests
        if ($suggestedEvents->isEmpty() && !empty($user->interests)) {
            $interests = strtolower($user->interests);
            
            // Map interests to category names
            $interestToCategory = [
                'music' => 'Music',
                'sport' => 'Sports',
                'tech' => 'Technology',
                'technology' => 'Technology',
                'art' => 'Art & Culture',
                'culture' => 'Art & Culture',
                'business' => 'Business & Networking',
                'networking' => 'Business & Networking',
                'food' => 'Food & Dining',
                'dining' => 'Food & Dining',
                'cooking' => 'Food & Dining',
                'education' => 'Education',
                'health' => 'Health & Wellness',
                'wellness' => 'Health & Wellness',
                'fitness' => 'Health & Wellness',
                'entertainment' => 'Entertainment',
                'gaming' => 'Entertainment',
                'travel' => 'Travel & Adventure',
                'adventure' => 'Travel & Adventure'
            ];
            
            $matchingCategories = collect();
            foreach ($interestToCategory as $interest => $categoryName) {
                if (str_contains($interests, $interest)) {
                    $category = Category::where('name', $categoryName)->first();
                    if ($category) {
                        $matchingCategories->push($category->id);
                    }
                }
            }
            
            if ($matchingCategories->isNotEmpty()) {
                $suggestedEvents = Event::with(['category', 'creator'])
                    ->whereIn('category_id', $matchingCategories)
                    ->whereNotIn('id', $allUserEvents->pluck('id'))
                    ->where('event_date', '>=', now()->toDateString())
                    ->orderBy('event_date')
                    ->limit(10)
                    ->get();
            }
        }
        
        // Method 3: Fallback to popular upcoming events
        if ($suggestedEvents->isEmpty()) {
            $suggestedEvents = Event::with(['category', 'creator'])
                ->withCount('userEvents')
                ->where('event_date', '>=', now()->toDateString())
                ->whereNotIn('id', $allUserEvents->pluck('id'))
                ->orderByDesc('user_events_count')
                ->orderBy('event_date')
                ->limit(10)
                ->get();
        }

        return response()->json([
            'success' => true,
            'suggested_events' => $suggestedEvents,
            'total_suggestions' => $suggestedEvents->count()
        ]);
    }
}
