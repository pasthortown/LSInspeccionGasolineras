import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PersonService } from './../../../services/CRUD/person.service';
import { Person } from './../../../models/Person';
import { GenderService } from './../../../services/CRUD/gender.service';
import { Gender } from './../../../models/Gender';


@Component({
   selector: 'app-person',
   templateUrl: './person.component.html',
   styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
   people: Person[] = [];
   personSelected: Person = new Person();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   genders: Gender[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private genderDataService: GenderService,
               private personDataService: PersonService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getGender();
   }

   selectPerson(person: Person) {
      this.personSelected = person;
   }

   getGender() {
      this.genders = [];
      this.genderDataService.get().then( r => {
         this.genders = r as Gender[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPeople();
   }

   getPeople() {
      this.people = [];
      this.personSelected = new Person();
      this.personSelected.gender_id = 0;
      this.personDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.people = r.data as Person[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPerson(content) {
      this.personSelected = new Person();
      this.personSelected.gender_id = 0;
      this.openDialog(content);
   }

   editPerson(content) {
      if (typeof this.personSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deletePerson() {
      if (typeof this.personSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.personDataService.delete(this.personSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPeople();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.personDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_People.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.personDataService.get().then( r => {
         const backupData = r as Person[];
         let output = 'id;identification;name;lastname;birth_date;phone_number;mobile_number;home_address;work_address;email;gender_id\n';
         backupData.forEach(element => {
            output += element.id; + element.identification + ';' + element.name + ';' + element.lastname + ';' + element.birth_date + ';' + element.phone_number + ';' + element.mobile_number + ';' + element.home_address + ';' + element.work_address + ';' + element.email + ';' + element.gender_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_People.csv');
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
            this.personDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.personSelected.id === 'undefined') {
               this.personDataService.post(this.personSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPeople();
               }).catch( e => console.log(e) );
            } else {
               this.personDataService.put(this.personSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPeople();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}