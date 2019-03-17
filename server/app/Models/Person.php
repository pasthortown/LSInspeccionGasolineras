<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'identification','name','lastname','birth_date','phone_number','mobile_number','home_address','work_address','email',
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

    function Establishments()
    {
       return $this->belongsToMany('App\Establishment')->withTimestamps();
    }

    function Gender()
    {
       return $this->hasOne('App\Gender');
    }

    function Rol()
    {
       return $this->belongsTo('App\Rol');
    }

}