<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return 'Web Wervice Realizado con LSCodeGenerator';
});

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);

   //CRUD ProfilePicture
   $router->post('/profilepicture', ['uses' => 'ProfilePictureController@post']);
   $router->get('/profilepicture', ['uses' => 'ProfilePictureController@get']);
   $router->get('/profilepicture/paginate', ['uses' => 'ProfilePictureController@paginate']);
   $router->put('/profilepicture', ['uses' => 'ProfilePictureController@put']);
   $router->delete('/profilepicture', ['uses' => 'ProfilePictureController@delete']);

   //CRUD User
   $router->post('/user', ['uses' => 'UserController@post']);
   $router->get('/user', ['uses' => 'UserController@get']);
   $router->get('/user/paginate', ['uses' => 'UserController@paginate']);
   $router->put('/user', ['uses' => 'UserController@put']);
   $router->delete('/user', ['uses' => 'UserController@delete']);

   //CRUD Person
   $router->post('/person', ['uses' => 'PersonController@post']);
   $router->get('/person', ['uses' => 'PersonController@get']);
   $router->get('/person/paginate', ['uses' => 'PersonController@paginate']);
   $router->get('/person/backup', ['uses' => 'PersonController@backup']);
   $router->put('/person', ['uses' => 'PersonController@put']);
   $router->delete('/person', ['uses' => 'PersonController@delete']);
   $router->post('/person/masive_load', ['uses' => 'PersonController@masiveLoad']);

   //CRUD Client
   $router->post('/client', ['uses' => 'ClientController@post']);
   $router->get('/client', ['uses' => 'ClientController@get']);
   $router->get('/client/paginate', ['uses' => 'ClientController@paginate']);
   $router->get('/client/backup', ['uses' => 'ClientController@backup']);
   $router->put('/client', ['uses' => 'ClientController@put']);
   $router->delete('/client', ['uses' => 'ClientController@delete']);
   $router->post('/client/masive_load', ['uses' => 'ClientController@masiveLoad']);

   //CRUD Establishment
   $router->post('/establishment', ['uses' => 'EstablishmentController@post']);
   $router->get('/establishment', ['uses' => 'EstablishmentController@get']);
   $router->get('/establishment/paginate', ['uses' => 'EstablishmentController@paginate']);
   $router->get('/establishment/backup', ['uses' => 'EstablishmentController@backup']);
   $router->put('/establishment', ['uses' => 'EstablishmentController@put']);
   $router->delete('/establishment', ['uses' => 'EstablishmentController@delete']);
   $router->post('/establishment/masive_load', ['uses' => 'EstablishmentController@masiveLoad']);

   //CRUD ClientType
   $router->post('/clienttype', ['uses' => 'ClientTypeController@post']);
   $router->get('/clienttype', ['uses' => 'ClientTypeController@get']);
   $router->get('/clienttype/paginate', ['uses' => 'ClientTypeController@paginate']);
   $router->get('/clienttype/backup', ['uses' => 'ClientTypeController@backup']);
   $router->put('/clienttype', ['uses' => 'ClientTypeController@put']);
   $router->delete('/clienttype', ['uses' => 'ClientTypeController@delete']);
   $router->post('/clienttype/masive_load', ['uses' => 'ClientTypeController@masiveLoad']);

   //CRUD Gender
   $router->post('/gender', ['uses' => 'GenderController@post']);
   $router->get('/gender', ['uses' => 'GenderController@get']);
   $router->get('/gender/paginate', ['uses' => 'GenderController@paginate']);
   $router->get('/gender/backup', ['uses' => 'GenderController@backup']);
   $router->put('/gender', ['uses' => 'GenderController@put']);
   $router->delete('/gender', ['uses' => 'GenderController@delete']);
   $router->post('/gender/masive_load', ['uses' => 'GenderController@masiveLoad']);

   //CRUD Rol
   $router->post('/rol', ['uses' => 'RolController@post']);
   $router->get('/rol', ['uses' => 'RolController@get']);
   $router->get('/rol/paginate', ['uses' => 'RolController@paginate']);
   $router->get('/rol/backup', ['uses' => 'RolController@backup']);
   $router->put('/rol', ['uses' => 'RolController@put']);
   $router->delete('/rol', ['uses' => 'RolController@delete']);
   $router->post('/rol/masive_load', ['uses' => 'RolController@masiveLoad']);
});
