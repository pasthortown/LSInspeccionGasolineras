import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ClientTypeService } from './../../../services/CRUD/clienttype.service';
import { ClientType } from './../../../models/ClientType';

@Component({
   selector: 'app-clienttype',
   templateUrl: './clienttype.component.html',
   styleUrls: ['./clienttype.component.scss']
})
export class ClientTypeComponent implements OnInit {
   client_types: ClientType[] = [];
   client_typeSelected: ClientType = new ClientType();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private client_typeDataService: ClientTypeService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectClientType(client_type: ClientType) {
      this.client_typeSelected = client_type;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getClientTypes();
   }

   getClientTypes() {
      this.client_types = [];
      this.client_typeSelected = new ClientType();
      this.client_typeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.client_types = r.data as ClientType[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newClientType(content) {
      this.client_typeSelected = new ClientType();
      this.openDialog(content);
   }

   editClientType(content) {
      if (typeof this.client_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteClientType() {
      if (typeof this.client_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.client_typeDataService.delete(this.client_typeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getClientTypes();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.client_typeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ClientTypes.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.client_typeDataService.get().then( r => {
         const backupData = r as ClientType[];
         let output = 'id;description\n';
         backupData.forEach(element => {
            output += element.id; + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ClientTypes.csv');
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
            this.client_typeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.client_typeSelected.id === 'undefined') {
               this.client_typeDataService.post(this.client_typeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getClientTypes();
               }).catch( e => console.log(e) );
            } else {
               this.client_typeDataService.put(this.client_typeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getClientTypes();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}