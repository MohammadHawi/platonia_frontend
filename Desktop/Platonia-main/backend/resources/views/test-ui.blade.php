<html>
<head>

</head>
<body>
<form action="/api/register" method="POST">

    @csrf
    <input type="text" name="name" placeholder="password">
    <input type="text" name="email" placeholder="email">

    <input type="text" name="password" placeholder="password">

    <input type="text" name="password_confirmation" placeholder="email">

    <input type="number" name="age" placeholder="password">

    <input type="text" name="gender" placeholder="email">




{{--    <input type="text">--}}
{{--    <input type="text">--}}
{{--    --}}
{{--    --}}
{{--    <input type="text">--}}
    <button type="submit">submit</button>
</form>
</body>
</html>
