<html>
<head>

</head>
<body>
<form action="/joinEvent" method="POST">
    @csrf
    <input type="number" name="event_id" placeholder="name">
    <input type="number" name="user_id" placeholder="topic">
{{--    <input type="text" name="event_place" placeholder="place">--}}
{{--    <input type="date" name="event_date"  placeholder="date">--}}
{{--    <input type="time" name="event_time" placeholder="time">--}}
{{--    <input type="number" name="event_capacity" placeholder="cap">--}}

{{--    <textarea name="event_description"></textarea>--}}
{{--    <input type="text">--}}
{{--    <input type="text">--}}
{{--    --}}
{{--    --}}
{{--    <input type="text">--}}
    <button type="submit">submit</button>
</form>
</body>
</html>
