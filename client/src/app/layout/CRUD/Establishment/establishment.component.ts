import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { EstablishmentService } from './../../../services/CRUD/establishment.service';
import { Establishment } from './../../../models/Establishment';
import { PersonService } from './../../../services/CRUD/person.service';
import { Person } from './../../../models/Person';


@Component({
   selector: 'app-establishment',
   templateUrl: './establishment.component.html',
   styleUrls: ['./establishment.component.scss']
})
export class EstablishmentComponent implements OnInit {
   establishments: Establishment[] = [];
   establishmentSelected: Establishment = new Establishment();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   people: Person[] = [];
   people_establishmentSelectedId: number;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private personDataService: PersonService,
               private establishmentDataService: EstablishmentService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getPerson();
   }

   selectEstablishment(establishment: Establishment) {
      this.establishmentSelected = establishment;
   }

   getPerson() {
      this.people = [];
      this.personDataService.get().then( r => {
         this.people = r as Person[];
      }).catch( e => console.log(e) );
   }

   getPeopleOnEstablishment() {
      this.establishmentSelected.people_on_establishment = [];
      this.establishmentDataService.get(this.establishmentSelected.id).then( r => {
         this.establishmentSelected.people_on_establishment = r.attach[0].people_on_establishment as Person[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getEstablishments();
   }

   getEstablishments() {
      this.establishments = [];
      this.establishmentSelected = new Establishment();
      this.people_establishmentSelectedId = 0;
      this.establishmentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.establishments = r.data as Establishment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newEstablishment(content) {
      this.establishmentSelected = new Establishment();
      this.people_establishmentSelectedId = 0;
      this.openDialog(content);
   }

   editEstablishment(content) {
      if ( typeof this.establishmentSelected.people_on_establishment === 'undefined' ) {
         this.establishmentSelected.people_on_establishment = [];
      }
      if (typeof this.establishmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.getPeopleOnEstablishment();
      this.people_establishmentSelectedId = 0;
      this.openDialog(content);
   }

   deleteEstablishment() {
      if (typeof this.establishmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.establishmentDataService.delete(this.establishmentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getEstablishments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.establishmentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Establishments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.establishmentDataService.get().then( r => {
         const backupData = r as Establishment[];
         let output = 'id;name;address;web_site;phone_number;mobile_number\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.address + ';' + element.web_site + ';' + element.phone_number + ';' + element.mobile_number + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Establishments.csv');
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
            this.establishmentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   selectPerson(person: Person) {
      this.people_establishmentSelectedId = person.id;
   }

   addPerson() {
      if (this.people_establishmentSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.people.forEach(person => {
         if (person.id == this.people_establishmentSelectedId) {
            let existe = false;
            this.establishmentSelected.people_on_establishment.forEach(element => {
               if (element.id == person.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.establishmentSelected.people_on_establishment.push(person);
               this.people_establishmentSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removePerson() {
      if (this.people_establishmentSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newPeople: Person[] = [];
      let eliminado = false;
      this.establishmentSelected.people_on_establishment.forEach(person => {
         if (person.id !== this.people_establishmentSelectedId) {
            newPeople.push(person);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.establishmentSelected.people_on_establishment = newPeople;
      this.people_establishmentSelectedId = 0;
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.establishmentSelected.id === 'undefined') {
               this.establishmentDataService.post(this.establishmentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getEstablishments();
               }).catch( e => console.log(e) );
            } else {
               this.establishmentDataService.put(this.establishmentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getEstablishments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}