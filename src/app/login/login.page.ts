import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginService } from '../api/login.service';
import { StorageService } from '../api/storage.service';
import { iLogin } from '../models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm;
  constructor(formBuilder: FormBuilder,
    private loginService:LoginService,
    private storage: StorageService,
    private loadingController: LoadingController,
    private router: Router) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.storage.userObservable.subscribe(data => {
      if(data.username != "Guest" || data.token != ""){
        this.loadingController.dismiss();
        this.router.navigateByUrl("/homepage");
      }
    });
    
  }

  async login(){
    this.presentLoading();
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    let form:iLogin = {
      user: username,
      password: password
    }
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
  }

}
