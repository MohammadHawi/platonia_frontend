<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'John Doe', 
                'email' => 'john@example.com', 
                'password' => Hash::make('password'),
                'age' => 25,
                'gender' => 'Male',
                'interests' => 'Music, Sports, Technology'
            ],
            [
                'name' => 'Jane Smith', 
                'email' => 'jane@example.com', 
                'password' => Hash::make('password'),
                'age' => 28,
                'gender' => 'Female',
                'interests' => 'Tech, Music, Art'
            ],
            [
                'name' => 'Mike Johnson', 
                'email' => 'mike@example.com', 
                'password' => Hash::make('password'),
                'age' => 32,
                'gender' => 'Male',
                'interests' => 'Sports, Fitness, Travel'
            ],
            [
                'name' => 'Sarah Wilson', 
                'email' => 'sarah@example.com', 
                'password' => Hash::make('password'),
                'age' => 26,
                'gender' => 'Female',
                'interests' => 'Art, Photography, Food'
            ],
            [
                'name' => 'David Brown', 
                'email' => 'david@example.com', 
                'password' => Hash::make('password'),
                'age' => 30,
                'gender' => 'Male',
                'interests' => 'Business, Networking, Technology'
            ],
            [
                'name' => 'Emily Davis', 
                'email' => 'emily@example.com', 
                'password' => Hash::make('password'),
                'age' => 24,
                'gender' => 'Female',
                'interests' => 'Music, Dance, Fashion'
            ],
            [
                'name' => 'Alex Chen', 
                'email' => 'alex@example.com', 
                'password' => Hash::make('password'),
                'age' => 29,
                'gender' => 'Male',
                'interests' => 'Gaming, Technology, Movies'
            ],
            [
                'name' => 'Lisa Garcia', 
                'email' => 'lisa@example.com', 
                'password' => Hash::make('password'),
                'age' => 27,
                'gender' => 'Female',
                'interests' => 'Cooking, Travel, Culture'
            ],
        ]);
    }
}

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->insert([
            ['name' => 'Music'],
            ['name' => 'Sports'],
            ['name' => 'Technology'],
            ['name' => 'Art & Culture'],
            ['name' => 'Business & Networking'],
            ['name' => 'Food & Dining'],
            ['name' => 'Education'],
            ['name' => 'Health & Wellness'],
            ['name' => 'Entertainment'],
            ['name' => 'Travel & Adventure'],
        ]);
    }
}

class EventsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('events')->insert([
            [
                'planner_name' => 'John Doe',
                'event_topic' => 'Summer Music Festival', 
                'event_place' => 'Central Park, New York', 
                'event_date' => '2024-07-15', 
                'event_time' => '18:00:00',
                'event_capacity' => 1000,
                'event_description' => 'A spectacular summer music festival featuring local and international artists. Enjoy live performances, food trucks, and a great atmosphere.',
                'category_id' => 1,
                'user_id' => 1
            ],
            [
                'planner_name' => 'Jane Smith',
                'event_topic' => 'Tech Innovation Summit', 
                'event_place' => 'San Francisco Convention Center', 
                'event_date' => '2024-08-20', 
                'event_time' => '09:00:00',
                'event_capacity' => 500,
                'event_description' => 'Join industry leaders and innovators for a day of cutting-edge technology discussions, workshops, and networking opportunities.',
                'category_id' => 3,
                'user_id' => 2
            ],
            [
                'planner_name' => 'Mike Johnson',
                'event_topic' => 'Marathon Training Workshop', 
                'event_place' => 'City Sports Complex', 
                'event_date' => '2024-06-30', 
                'event_time' => '07:00:00',
                'event_capacity' => 100,
                'event_description' => 'Get ready for the upcoming marathon with professional training tips, nutrition advice, and group running sessions.',
                'category_id' => 2,
                'user_id' => 3
            ],
            [
                'planner_name' => 'Sarah Wilson',
                'event_topic' => 'Art Gallery Opening', 
                'event_place' => 'Downtown Art Gallery', 
                'event_date' => '2024-07-08', 
                'event_time' => '19:00:00',
                'event_capacity' => 200,
                'event_description' => 'Experience the opening of our latest contemporary art exhibition featuring works from emerging local artists.',
                'category_id' => 4,
                'user_id' => 4
            ],
            [
                'planner_name' => 'David Brown',
                'event_topic' => 'Business Networking Mixer', 
                'event_place' => 'Grand Hotel Ballroom', 
                'event_date' => '2024-07-22', 
                'event_time' => '18:30:00',
                'event_capacity' => 150,
                'event_description' => 'Connect with professionals from various industries. Perfect opportunity for business development and career growth.',
                'category_id' => 5,
                'user_id' => 5
            ],
            [
                'planner_name' => 'Emily Davis',
                'event_topic' => 'Jazz Night Under the Stars', 
                'event_place' => 'Riverside Amphitheater', 
                'event_date' => '2024-08-05', 
                'event_time' => '20:00:00',
                'event_capacity' => 300,
                'event_description' => 'An enchanting evening of live jazz music under the open sky. Bring your own picnic and enjoy the smooth melodies.',
                'category_id' => 1,
                'user_id' => 6
            ],
            [
                'planner_name' => 'Alex Chen',
                'event_topic' => 'Gaming Convention', 
                'event_place' => 'Convention Center', 
                'event_date' => '2024-09-10', 
                'event_time' => '10:00:00',
                'event_capacity' => 800,
                'event_description' => 'The biggest gaming event of the year! Try new games, meet developers, participate in tournaments, and win prizes.',
                'category_id' => 9,
                'user_id' => 7
            ],
            [
                'planner_name' => 'Lisa Garcia',
                'event_topic' => 'International Food Festival', 
                'event_place' => 'City Square', 
                'event_date' => '2024-08-12', 
                'event_time' => '12:00:00',
                'event_capacity' => 400,
                'event_description' => 'Taste cuisines from around the world! Food trucks, cooking demonstrations, and cultural performances.',
                'category_id' => 6,
                'user_id' => 8
            ],
            [
                'planner_name' => 'John Doe',
                'event_topic' => 'Photography Workshop', 
                'event_place' => 'Botanical Gardens', 
                'event_date' => '2024-07-28', 
                'event_time' => '14:00:00',
                'event_capacity' => 50,
                'event_description' => 'Learn photography techniques from professionals. Capture the beauty of nature in our stunning botanical gardens.',
                'category_id' => 4,
                'user_id' => 1
            ],
            [
                'planner_name' => 'Jane Smith',
                'event_topic' => 'Startup Pitch Competition', 
                'event_place' => 'Innovation Hub', 
                'event_date' => '2024-09-15', 
                'event_time' => '16:00:00',
                'event_capacity' => 200,
                'event_description' => 'Watch innovative startups pitch their ideas to investors. Great opportunity for entrepreneurs and investors alike.',
                'category_id' => 5,
                'user_id' => 2
            ],
        ]);
    }
}

class UserEventsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_events')->insert([
            // User 1 (John) attending events
            ['user_id' => 1, 'event_id' => 1], // Summer Music Festival
            ['user_id' => 1, 'event_id' => 3], // Marathon Training
            ['user_id' => 1, 'event_id' => 6], // Jazz Night
            ['user_id' => 1, 'event_id' => 8], // Food Festival
            
            // User 2 (Jane) attending events
            ['user_id' => 2, 'event_id' => 2], // Tech Innovation Summit
            ['user_id' => 2, 'event_id' => 5], // Business Networking
            ['user_id' => 2, 'event_id' => 7], // Gaming Convention
            ['user_id' => 2, 'event_id' => 10], // Startup Pitch
            
            // User 3 (Mike) attending events
            ['user_id' => 3, 'event_id' => 3], // Marathon Training (organizing)
            ['user_id' => 3, 'event_id' => 1], // Summer Music Festival
            ['user_id' => 3, 'event_id' => 5], // Business Networking
            ['user_id' => 3, 'event_id' => 8], // Food Festival
            
            // User 4 (Sarah) attending events
            ['user_id' => 4, 'event_id' => 4], // Art Gallery Opening (organizing)
            ['user_id' => 4, 'event_id' => 6], // Jazz Night
            ['user_id' => 4, 'event_id' => 9], // Photography Workshop
            ['user_id' => 4, 'event_id' => 8], // Food Festival
            
            // User 5 (David) attending events
            ['user_id' => 5, 'event_id' => 5], // Business Networking (organizing)
            ['user_id' => 5, 'event_id' => 2], // Tech Innovation Summit
            ['user_id' => 5, 'event_id' => 10], // Startup Pitch
            ['user_id' => 5, 'event_id' => 7], // Gaming Convention
            
            // User 6 (Emily) attending events
            ['user_id' => 6, 'event_id' => 6], // Jazz Night (organizing)
            ['user_id' => 6, 'event_id' => 1], // Summer Music Festival
            ['user_id' => 6, 'event_id' => 4], // Art Gallery Opening
            ['user_id' => 6, 'event_id' => 9], // Photography Workshop
            
            // User 7 (Alex) attending events
            ['user_id' => 7, 'event_id' => 7], // Gaming Convention (organizing)
            ['user_id' => 7, 'event_id' => 2], // Tech Innovation Summit
            ['user_id' => 7, 'event_id' => 10], // Startup Pitch
            ['user_id' => 7, 'event_id' => 5], // Business Networking
            
            // User 8 (Lisa) attending events
            ['user_id' => 8, 'event_id' => 8], // Food Festival (organizing)
            ['user_id' => 8, 'event_id' => 4], // Art Gallery Opening
            ['user_id' => 8, 'event_id' => 6], // Jazz Night
            ['user_id' => 8, 'event_id' => 9], // Photography Workshop
        ]);
    }
}

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            CategoriesTableSeeder::class,
            EventsTableSeeder::class,
            UserEventsTableSeeder::class,
        ]);
    }
}
