# Platonia Event Management API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication Endpoints

### Register User
- **URL:** `POST /register`
- **Description:** Register a new user
- **Parameters:**
  ```json
  {
    "name": "string (required, max 255)",
    "email": "string (required, unique)",
    "password": "string (required, confirmed)",
    "password_confirmation": "string (required)",
    "age": "integer (required, 13-120)",
    "gender": "string (required, Male/Female/Other)",
    "interests": "string (optional, max 500)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": { ... }
  }
  ```

### Login User
- **URL:** `POST /login`
- **Description:** Authenticate user
- **Parameters:**
  ```json
  {
    "email": "string (required)",
    "password": "string (required)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": { ... }
  }
  ```

### Get User
- **URL:** `GET /users/{id}`
- **Description:** Get user details by ID
- **Response:**
  ```json
  {
    "success": true,
    "user": { ... }
  }
  ```

## Event Endpoints

### Get Events Feed
- **URL:** `GET /events`
- **Description:** Get all events with optional category filter
- **Query Parameters:**
  - `category_id` (optional): Filter by category ID
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "planner_name": "string",
        "event_topic": "string",
        "event_place": "string",
        "event_date": "date",
        "event_time": "time",
        "event_capacity": "integer",
        "event_description": "string",
        "category": { ... },
        "creator": { ... }
      }
    ],
    "categories": [ ... ]
  }
  ```

### Create Event
- **URL:** `POST /events`
- **Description:** Create a new event
- **Parameters:**
  ```json
  {
    "planner_name": "string (required, max 255)",
    "event_topic": "string (required, max 255)",
    "event_place": "string (required, max 255)",
    "event_date": "date (required, after today)",
    "event_time": "time (required, HH:mm format)",
    "event_capacity": "integer (required, 1-10000)",
    "event_description": "string (required, max 1000)",
    "category_id": "integer (required, exists in categories)",
    "user_id": "integer (required, exists in users)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Event created successfully",
    "event": { ... }
  }
  ```

### Get Event Details
- **URL:** `GET /events/{id}`
- **Description:** Get specific event details
- **Response:**
  ```json
  {
    "success": true,
    "event": { ... },
    "remaining_capacity": "integer",
    "current_attendees": "integer",
    "is_full": "boolean"
  }
  ```

### Join Event
- **URL:** `POST /events/join`
- **Description:** Join an event
- **Parameters:**
  ```json
  {
    "event_id": "integer (required, exists in events)",
    "user_id": "integer (required, exists in users)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Successfully joined the event"
  }
  ```

### Get Event Members
- **URL:** `GET /events/{event_id}/members`
- **Description:** Get all members of an event
- **Response:**
  ```json
  {
    "success": true,
    "members": [
      {
        "id": "integer",
        "name": "string",
        "user_id": "integer",
        "event_id": "integer"
      }
    ]
  }
  ```

### Remove Member from Event
- **URL:** `POST /events/members/remove`
- **Description:** Remove a user from an event
- **Parameters:**
  ```json
  {
    "user_id": "integer (required, exists in users)",
    "event_id": "integer (required, exists in events)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Member removed successfully"
  }
  ```

### Get Suggested Events
- **URL:** `POST /events/suggested`
- **Description:** Get event suggestions based on user's interests
- **Parameters:**
  ```json
  {
    "user_id": "integer (required, exists in users)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "suggested_events": [ ... ]
  }
  ```

## Profile Endpoints

### Edit Profile
- **URL:** `POST /profile/edit`
- **Description:** Update user profile
- **Parameters:**
  ```json
  {
    "id": "integer (required, exists in users)",
    "name": "string (required, max 255)",
    "age": "integer (required, 13-120)",
    "gender": "string (required, Male/Female/Other)",
    "interests": "string (optional, max 500)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "user": { ... }
  }
  ```

### Get User Events
- **URL:** `GET /users/{user_id}/events`
- **Description:** Get all events a user is attending
- **Response:**
  ```json
  {
    "success": true,
    "events": [ ... ]
  }
  ```

## Dashboard Endpoints

### Get Dashboard Data
- **URL:** `POST /dashboard`
- **Description:** Get dashboard statistics and data
- **Parameters:**
  ```json
  {
    "user_id": "integer (required, exists in users)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "dashboard_data": {
      "total_members": "integer",
      "total_events_created": "integer",
      "top_events": [ ... ],
      "upcoming_events": [ ... ]
    }
  }
  ```

## Legacy Endpoints (Backward Compatibility)

The following legacy endpoints are still available but deprecated:

- `GET /landing` → `GET /events`
- `GET /eventView/{id}` → `GET /events/{id}`
- `GET /userView/{user_id}` → `GET /users/{user_id}/events`
- `GET /event-members/{event_id}` → `GET /events/{event_id}/members`
- `POST /newEvent` → `POST /events`
- `POST /joinEvent` → `POST /events/join`
- `POST /editProfile` → `POST /profile/edit`
- `POST /suggested-events` → `POST /events/suggested`

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": { ... }
}
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `422` - Validation Error

## Data Models

### User
```json
{
  "id": "integer",
  "name": "string",
  "email": "string",
  "age": "integer",
  "gender": "string",
  "interests": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Event
```json
{
  "id": "integer",
  "planner_name": "string",
  "event_topic": "string",
  "event_place": "string",
  "event_date": "date",
  "event_time": "time",
  "event_capacity": "integer",
  "event_description": "string",
  "category_id": "integer",
  "user_id": "integer",
  "category": { ... },
  "creator": { ... }
}
```

### Category
```json
{
  "id": "integer",
  "name": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## Testing the API

You can test the API using curl or any API client like Postman. Here are some example requests:

```bash
# Get all events
curl -X GET "http://localhost:8000/api/events"

# Get events by category
curl -X GET "http://localhost:8000/api/events?category_id=1"

# Get specific event
curl -X GET "http://localhost:8000/api/events/1"

# Get user details
curl -X GET "http://localhost:8000/api/users/1"

# Get dashboard data
curl -X POST "http://localhost:8000/api/dashboard" \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1}'
```

## Features Implemented

✅ **User Management**
- User registration with validation
- User authentication
- Profile editing
- User retrieval

✅ **Event Management**
- Event creation with validation
- Event listing with category filtering
- Event details with capacity tracking
- Event joining/leaving
- Member management

✅ **Dashboard & Analytics**
- User dashboard with statistics
- Event suggestions based on interests
- Top events by attendance
- Upcoming events

✅ **Data Relationships**
- User-Event many-to-many relationships
- Category-Event relationships
- Proper foreign key constraints

✅ **API Standards**
- Consistent response formats
- Proper HTTP status codes
- Input validation
- Error handling
- RESTful endpoint design 