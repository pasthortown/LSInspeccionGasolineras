<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Establishment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name','address','web_site','phone_number','mobile_number',
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

    function People()
    {
       return $this->belongsToMany('App\Person')->withTimestamps();
    }

}