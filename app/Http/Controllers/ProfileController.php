<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    public function index(Request $request)
    {
        return inertia('profile/index', [
            'user' => $request->user(),
        ]);
    }
    public function address(Request $request)
    {
        return inertia('profile/address', [
            'user' => $request->user(),
        ]);
    }
}
