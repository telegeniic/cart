import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import { LoginService } from '../api/login.service';
import { StorageService } from '../api/storage.service';
import { Login } from '../models/Login.interface';

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
      console.log(data);
      if(this.loader){
        this.loader = false;
        this.loadingController.dismiss().then();
      }
      if(data.logged){this.router.navigateByUrl('/dashboard').then();}
    });
    this.storage.errorObservable.subscribe(e => {
      if(this.loader){
        this.loader = false;
        this.loadingController.dismiss().then();
        this.presentAlert(e.message).then();
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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Error',
      message,
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
