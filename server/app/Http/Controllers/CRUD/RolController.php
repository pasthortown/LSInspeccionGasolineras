<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Rol;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RolController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Rol::get(),200);
       } else {
          $rol = Rol::findOrFail($id);
          $attach = [];
          return response()->json(["Rol"=>$rol, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Rol::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $rol = new Rol();
          $lastRol = Rol::orderBy('id')->get()->last();
          if($lastRol) {
             $rol->id = $lastRol->id + 1;
          } else {
             $rol->id = 1;
          }
          $rol->description = $result['description'];
          $rol->person_id = $result['person_id'];
          $rol->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($rol,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $rol = Rol::where('id',$result['id'])->update([
             'description'=>$result['description'],
             'person_id'=>$result['person_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($rol,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Rol::destroy($id);
    }

    function backup(Request $data)
    {
       $rols = Rol::get();
       $toReturn = [];
       foreach( $rols as $rol) {
          $attach = [];
          array_push($toReturn, ["Rol"=>$rol, "attach"=>$attach]);
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
         $result = $row['Rol'];
         $exist = Rol::where('id',$result['id'])->first();
         if ($exist) {
           Rol::where('id', $result['id'])->update([
             'description'=>$result['description'],
             'person_id'=>$result['person_id'],
           ]);
         } else {
          $rol = new Rol();
          $rol->id = $result['id'];
          $rol->description = $result['description'];
          $rol->person_id = $result['person_id'];
          $rol->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}