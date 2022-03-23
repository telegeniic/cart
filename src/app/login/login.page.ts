import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginService } from '../api/login.service';
import { StorageService } from '../api/storage.service';
import { Login } from '../models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm;
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private storage: StorageService,
    private loadingController: LoadingController,
    private router: Router) {
    this.storage.userObservable.subscribe(data => {
      if(data.logged){
        this.loadingController.dismiss().then();
        this.router.navigateByUrl('/homepage').then();
      }
      if(!data.logged && data.logged != null){
        this.loadingController.dismiss().then();
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
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Please wait...',
      //duration: 2000
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
