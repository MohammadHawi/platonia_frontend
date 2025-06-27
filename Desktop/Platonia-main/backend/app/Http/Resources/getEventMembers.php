<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class getEventMembers extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->user->name,
            'user_id' => $this->user->id,
            'event_id' => $this->event_id,
        ];
    }
}
