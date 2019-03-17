import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ClientService } from './../../../services/CRUD/client.service';
import { Client } from './../../../models/Client';
import { PersonService } from './../../../services/CRUD/person.service';
import { Person } from './../../../models/Person';

import { ClientTypeService } from './../../../services/CRUD/clienttype.service';
import { ClientType } from './../../../models/ClientType';

import { EstablishmentService } from './../../../services/CRUD/establishment.service';
import { Establishment } from './../../../models/Establishment';


@Component({
   selector: 'app-client',
   templateUrl: './client.component.html',
   styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
   clients: Client[] = [];
   clientSelected: Client = new Client();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   people: Person[] = [];
   client_types: ClientType[] = [];
   establishments: Establishment[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private personDataService: PersonService,
               private client_typeDataService: ClientTypeService,
               private establishmentDataService: EstablishmentService,
               private clientDataService: ClientService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getPerson();
      this.getClientType();
      this.getEstablishment();
   }

   selectClient(client: Client) {
      this.clientSelected = client;
   }

   getPerson() {
      this.people = [];
      this.personDataService.get().then( r => {
         this.people = r as Person[];
      }).catch( e => console.log(e) );
   }

   getClientType() {
      this.client_types = [];
      this.client_typeDataService.get().then( r => {
         this.client_types = r as ClientType[];
      }).catch( e => console.log(e) );
   }

   getEstablishment() {
      this.establishments = [];
      this.establishmentDataService.get().then( r => {
         this.establishments = r as Establishment[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getClients();
   }

   getClients() {
      this.clients = [];
      this.clientSelected = new Client();
      this.clientSelected.person_id = 0;
      this.clientSelected.client_type_id = 0;
      this.clientSelected.establishment_id = 0;
      this.clientDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.clients = r.data as Client[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newClient(content) {
      this.clientSelected = new Client();
      this.clientSelected.person_id = 0;
      this.clientSelected.client_type_id = 0;
      this.clientSelected.establishment_id = 0;
      this.openDialog(content);
   }

   editClient(content) {
      if (typeof this.clientSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteClient() {
      if (typeof this.clientSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.clientDataService.delete(this.clientSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getClients();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.clientDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Clients.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.clientDataService.get().then( r => {
         const backupData = r as Client[];
         let output = 'id;ruc;person_id;client_type_id;establishment_id\n';
         backupData.forEach(element => {
            output += element.id; + element.ruc + ';' + element.person_id + ';' + element.client_type_id + ';' + element.establishment_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Clients.csv');
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
            this.clientDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.clientSelected.id === 'undefined') {
               this.clientDataService.post(this.clientSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getClients();
               }).catch( e => console.log(e) );
            } else {
               this.clientDataService.put(this.clientSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getClients();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}