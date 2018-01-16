<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;

class escapeCharController extends Controller
{
    //
    public static function escape($string){
        return htmlspecialchars($string,ENT_COMPAT,'UTF-8');
    }
}
