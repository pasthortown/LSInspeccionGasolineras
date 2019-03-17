<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Client;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ClientController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Client::get(),200);
       } else {
          $client = Client::findOrFail($id);
          $attach = [];
          return response()->json(["Client"=>$client, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Client::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $client = new Client();
          $lastClient = Client::orderBy('id')->get()->last();
          if($lastClient) {
             $client->id = $lastClient->id + 1;
          } else {
             $client->id = 1;
          }
          $client->ruc = $result['ruc'];
          $client->person_id = $result['person_id'];
          $client->client_type_id = $result['client_type_id'];
          $client->establishment_id = $result['establishment_id'];
          $client->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($client,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $client = Client::where('id',$result['id'])->update([
             'ruc'=>$result['ruc'],
             'person_id'=>$result['person_id'],
             'client_type_id'=>$result['client_type_id'],
             'establishment_id'=>$result['establishment_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($client,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Client::destroy($id);
    }

    function backup(Request $data)
    {
       $clients = Client::get();
       $toReturn = [];
       foreach( $clients as $client) {
          $attach = [];
          array_push($toReturn, ["Client"=>$client, "attach"=>$attach]);
       }
       return response()->json($toReturn,200);
    }

    function masiveLoad(Request $data)
    {
      $incomming = $data->json()->all();
      $masiveData = $incomming['data'];
      try{
       DB::beginTransaction();
       foreach($masiveData as $row) {
         $result = $row['Client'];
         $exist = Client::where('id',$result['id'])->first();
         if ($exist) {
           Client::where('id', $result['id'])->update([
             'ruc'=>$result['ruc'],
             'person_id'=>$result['person_id'],
             'client_type_id'=>$result['client_type_id'],
             'establishment_id'=>$result['establishment_id'],
           ]);
         } else {
          $client = new Client();
          $client->id = $result['id'];
          $client->ruc = $result['ruc'];
          $client->person_id = $result['person_id'];
          $client->client_type_id = $result['client_type_id'];
          $client->establishment_id = $result['establishment_id'];
          $client->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}