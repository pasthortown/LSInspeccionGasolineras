<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'description',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Client()
    {
       return $this->belongsTo('App\Client');
    }

}