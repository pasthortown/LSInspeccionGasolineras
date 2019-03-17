<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\ClientType;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ClientTypeController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(ClientType::get(),200);
       } else {
          $clienttype = ClientType::findOrFail($id);
          $attach = [];
          return response()->json(["ClientType"=>$clienttype, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(ClientType::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $clienttype = new ClientType();
          $lastClientType = ClientType::orderBy('id')->get()->last();
          if($lastClientType) {
             $clienttype->id = $lastClientType->id + 1;
          } else {
             $clienttype->id = 1;
          }
          $clienttype->description = $result['description'];
          $clienttype->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($clienttype,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $clienttype = ClientType::where('id',$result['id'])->update([
             'description'=>$result['description'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($clienttype,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return ClientType::destroy($id);
    }

    function backup(Request $data)
    {
       $clienttypes = ClientType::get();
       $toReturn = [];
       foreach( $clienttypes as $clienttype) {
          $attach = [];
          array_push($toReturn, ["ClientType"=>$clienttype, "attach"=>$attach]);
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
         $result = $row['ClientType'];
         $exist = ClientType::where('id',$result['id'])->first();
         if ($exist) {
           ClientType::where('id', $result['id'])->update([
             'description'=>$result['description'],
           ]);
         } else {
          $clienttype = new ClientType();
          $clienttype->id = $result['id'];
          $clienttype->description = $result['description'];
          $clienttype->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}