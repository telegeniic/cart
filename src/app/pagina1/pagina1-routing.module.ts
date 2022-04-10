import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pagina1Page } from './pagina1.page';
import { NavController } from '@ionic/angular';




const routes: Routes = [
  {
      path: '',
      pathMatch: 'full'
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],


})
export class Pagina1PageRoutingModule {
  constructor(punlic, navCtrl: NavController){

}
}
