import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            redirectTo: 'main'
         },
         {
            path: 'main',
            loadChildren: './main/main.module#MainModule'
         },
         {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
         },
         {
            path: 'person',
            loadChildren: './CRUD/Person/person.module#PersonModule'
         },
         {
            path: 'client',
            loadChildren: './CRUD/Client/client.module#ClientModule'
         },
         {
            path: 'establishment',
            loadChildren: './CRUD/Establishment/establishment.module#EstablishmentModule'
         },
         {
            path: 'client_type',
            loadChildren: './CRUD/ClientType/clienttype.module#ClientTypeModule'
         },
         {
            path: 'gender',
            loadChildren: './CRUD/Gender/gender.module#GenderModule'
         },
         {
            path: 'rol',
            loadChildren: './CRUD/Rol/rol.module#RolModule'
         },
         {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
         },
         {
            path: 'not-found',
            loadChildren: './not-found/not-found.module#NotFoundModule'
         },
         {
            path: '**',
            redirectTo: 'not-found'
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule {}