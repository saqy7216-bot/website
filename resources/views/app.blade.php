<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Rizon Technologies — Transformative software solutions for modern businesses.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    </link>

    {{-- Prevent theme flash: apply saved theme before CSS loads --}}
    <script>
        (function() {
            try {
                var t = localStorage.getItem('theme');
                if (t) document.documentElement.setAttribute('data-theme', t);
            } catch (e) {}
        })();
    </script>

    <title inertia>{{ config('app.name', 'Rizon Technologies') }}</title>

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    {{-- Scripts & styles (Vite) --}}
    @viteReactRefresh
    @vite(['resources/css/rizon.css', 'resources/js/app.jsx'])
    @inertiaHead
    @routes
</head>

<body>
    @inertia
</body>

</html>