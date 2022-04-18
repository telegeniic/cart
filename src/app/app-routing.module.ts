import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'view-quotation',
    loadChildren: () => import('./quotations/view-quotation/view-quotation.module').then( m => m.ViewQuotationPageModule)
  },
  {
    path: 'create-quotation',
    loadChildren: () => import('./quotations/create-quotation/create-quotation.module').then( m => m.CreateQuotationPageModule)
  },
  {
    path: 'edit-quotation',
    loadChildren: () => import('./quotations/edit-quotation/edit-quotation.module').then( m => m.EditQuotationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
