<?php

namespace seekit\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class accessLevel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::user()->role_id == 1) {
               return redirect()->back();
           }   
        return $next($request);
    }
}
