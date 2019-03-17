<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Establishment;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EstablishmentController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Establishment::get(),200);
       } else {
          $establishment = Establishment::findOrFail($id);
          $attach = [];
          $people_on_establishment = $establishment->People()->get();
          array_push($attach, ["people_on_establishment"=>$people_on_establishment]);
          return response()->json(["Establishment"=>$establishment, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Establishment::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $establishment = new Establishment();
          $lastEstablishment = Establishment::orderBy('id')->get()->last();
          if($lastEstablishment) {
             $establishment->id = $lastEstablishment->id + 1;
          } else {
             $establishment->id = 1;
          }
          $establishment->name = $result['name'];
          $establishment->address = $result['address'];
          $establishment->web_site = $result['web_site'];
          $establishment->phone_number = $result['phone_number'];
          $establishment->mobile_number = $result['mobile_number'];
          $establishment->save();
          $people_on_establishment = $result['people_on_establishment'];
          foreach( $people_on_establishment as $person) {
             $establishment->People()->attach($person['id']);
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($establishment,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $establishment = Establishment::where('id',$result['id'])->update([
             'name'=>$result['name'],
             'address'=>$result['address'],
             'web_site'=>$result['web_site'],
             'phone_number'=>$result['phone_number'],
             'mobile_number'=>$result['mobile_number'],
          ]);
          $establishment = Establishment::where('id',$result['id'])->first();
          $people_on_establishment = $result['people_on_establishment'];
          $people_on_establishment_old = $establishment->People()->get();
          foreach( $people_on_establishment_old as $person_old ) {
             $delete = true;
             foreach( $people_on_establishment as $person ) {
                if ( $person_old->id === $person['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $establishment->People()->detach($person_old->id);
             }
          }
          foreach( $people_on_establishment as $person ) {
             $add = true;
             foreach( $people_on_establishment_old as $person_old) {
                if ( $person_old->id === $person['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $establishment->People()->attach($person['id']);
             }
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($establishment,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Establishment::destroy($id);
    }

    function backup(Request $data)
    {
       $establishments = Establishment::get();
       $toReturn = [];
       foreach( $establishments as $establishment) {
          $attach = [];
          $people_on_establishment = $establishment->People()->get();
          array_push($attach, ["people_on_establishment"=>$people_on_establishment]);
          array_push($toReturn, ["Establishment"=>$establishment, "attach"=>$attach]);
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
         $result = $row['Establishment'];
         $exist = Establishment::where('id',$result['id'])->first();
         if ($exist) {
           Establishment::where('id', $result['id'])->update([
             'name'=>$result['name'],
             'address'=>$result['address'],
             'web_site'=>$result['web_site'],
             'phone_number'=>$result['phone_number'],
             'mobile_number'=>$result['mobile_number'],
           ]);
         } else {
          $establishment = new Establishment();
          $establishment->id = $result['id'];
          $establishment->name = $result['name'];
          $establishment->address = $result['address'];
          $establishment->web_site = $result['web_site'];
          $establishment->phone_number = $result['phone_number'];
          $establishment->mobile_number = $result['mobile_number'];
          $establishment->save();
         }
         $establishment = Establishment::where('id',$result['id'])->first();
         $people_on_establishment = [];
         foreach($row['attach'] as $attach){
            $people_on_establishment = $attach['people_on_establishment'];
         }
         $people_on_establishment_old = $establishment->People()->get();
         foreach( $people_on_establishment_old as $person_old ) {
            $delete = true;
            foreach( $people_on_establishment as $person ) {
               if ( $person_old->id === $person['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $establishment->People()->detach($person_old->id);
            }
         }
         foreach( $people_on_establishment as $person ) {
            $add = true;
            foreach( $people_on_establishment_old as $person_old) {
               if ( $person_old->id === $person['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $establishment->People()->attach($person['id']);
            }
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}