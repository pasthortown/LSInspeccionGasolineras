import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { RolService } from './../../../services/CRUD/rol.service';
import { Rol } from './../../../models/Rol';
import { PersonService } from './../../../services/CRUD/person.service';
import { Person } from './../../../models/Person';


@Component({
   selector: 'app-rol',
   templateUrl: './rol.component.html',
   styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
   rols: Rol[] = [];
   rolSelected: Rol = new Rol();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   people: Person[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private personDataService: PersonService,
               private rolDataService: RolService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getPerson();
   }

   selectRol(rol: Rol) {
      this.rolSelected = rol;
   }

   getPerson() {
      this.people = [];
      this.personDataService.get().then( r => {
         this.people = r as Person[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getRols();
   }

   getRols() {
      this.rols = [];
      this.rolSelected = new Rol();
      this.rolSelected.person_id = 0;
      this.rolDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.rols = r.data as Rol[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newRol(content) {
      this.rolSelected = new Rol();
      this.rolSelected.person_id = 0;
      this.openDialog(content);
   }

   editRol(content) {
      if (typeof this.rolSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteRol() {
      if (typeof this.rolSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.rolDataService.delete(this.rolSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getRols();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.rolDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Rols.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.rolDataService.get().then( r => {
         const backupData = r as Rol[];
         let output = 'id;description;person_id\n';
         backupData.forEach(element => {
            output += element.id; + element.description + ';' + element.person_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Rols.csv');
      }).catch( e => console.log(e) );
   }

   decodeUploadFile(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            const fileBytes = reader.result.toString().split(',')[1];
            const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
            this.rolDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.rolSelected.id === 'undefined') {
               this.rolDataService.post(this.rolSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getRols();
               }).catch( e => console.log(e) );
            } else {
               this.rolDataService.put(this.rolSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getRols();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}