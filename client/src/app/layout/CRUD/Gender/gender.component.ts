import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { GenderService } from './../../../services/CRUD/gender.service';
import { Gender } from './../../../models/Gender';

@Component({
   selector: 'app-gender',
   templateUrl: './gender.component.html',
   styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit {
   genders: Gender[] = [];
   genderSelected: Gender = new Gender();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private genderDataService: GenderService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectGender(gender: Gender) {
      this.genderSelected = gender;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getGenders();
   }

   getGenders() {
      this.genders = [];
      this.genderSelected = new Gender();
      this.genderDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.genders = r.data as Gender[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newGender(content) {
      this.genderSelected = new Gender();
      this.openDialog(content);
   }

   editGender(content) {
      if (typeof this.genderSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteGender() {
      if (typeof this.genderSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.genderDataService.delete(this.genderSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getGenders();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.genderDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Genders.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.genderDataService.get().then( r => {
         const backupData = r as Gender[];
         let output = 'id;description\n';
         backupData.forEach(element => {
            output += element.id; + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Genders.csv');
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
            this.genderDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.genderSelected.id === 'undefined') {
               this.genderDataService.post(this.genderSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getGenders();
               }).catch( e => console.log(e) );
            } else {
               this.genderDataService.put(this.genderSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getGenders();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}