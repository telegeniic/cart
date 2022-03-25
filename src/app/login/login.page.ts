import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import { LoginService } from '../api/login.service';
import { StorageService } from '../api/storage.service';
import { Login } from '../models/login.interface';
import {LoginError} from '../models/loginError.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm;

  private loader = false;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private storage: StorageService,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController
  ) {
    this.storage.userObservable.subscribe(data => {
      if(this.loader){
        this.loader = false;
        this.loadingController.dismiss().then();
      }
      if(data.logged){this.router.navigateByUrl('/homepage').then();}
    });
    this.storage.loginErrorObservable.subscribe(data => {
      if(this.loader){
        this.loader = false;
        this.loadingController.dismiss().then();
        this.presentAlert(data).then();
      }
    });
  }

  async login(){
    this.presentLoading().then();
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const form: Login = {
      user: username,
      password
    };
    this.loginService.login(form);
  }

  async presentLoading() {
    this.loader = true;
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Please wait...',
      //duration: 2000
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

  async presentAlert(data: LoginError) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: data.message,
      subHeader: 'Credenciales incorrectas',
      message: 'Favor de intentar de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
