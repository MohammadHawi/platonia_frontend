<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'planner_name',
        'event_topic',
        'event_place',
        'event_date',
        'event_time',
        'event_capacity',
        'event_description',
        'user_id',
        'category_id'
    ];

    /**
     * Get the user who created this event
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the category of this event
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the users attending this event
     */
    public function attendees()
    {
        return $this->belongsToMany(User::class, 'user_events', 'event_id', 'user_id');
    }

    /**
     * Get the user event relationships
     */
    public function userEvents()
    {
        return $this->hasMany(UserEvent::class);
    }

    /**
     * Get the number of current attendees
     */
    public function getCurrentAttendeesCountAttribute()
    {
        return $this->userEvents()->count();
    }

    /**
     * Get the remaining capacity
     */
    public function getRemainingCapacityAttribute()
    {
        return $this->event_capacity - $this->current_attendees_count;
    }

    /**
     * Check if event is full
     */
    public function getIsFullAttribute()
    {
        return $this->current_attendees_count >= $this->event_capacity;
    }
}
