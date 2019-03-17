<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'ruc',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Person()
    {
       return $this->hasOne('App\Person');
    }

    function ClientType()
    {
       return $this->hasOne('App\ClientType');
    }

    function Establishment()
    {
       return $this->hasOne('App\Establishment');
    }

}