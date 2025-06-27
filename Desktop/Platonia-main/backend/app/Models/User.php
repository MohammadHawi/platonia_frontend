<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'age',
        'gender',
        'interests',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the events that the user has created
     */
    public function createdEvents()
    {
        return $this->hasMany(Event::class, 'user_id');
    }

    /**
     * Get the events that the user is attending
     */
    public function attendingEvents()
    {
        return $this->belongsToMany(Event::class, 'user_events', 'user_id', 'event_id');
    }

    /**
     * Get the user's event participations
     */
    public function userEvents()
    {
        return $this->hasMany(UserEvent::class);
    }
}
