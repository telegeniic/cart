import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../api/login.service';
import { iLogin } from '../modules/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm;
  constructor(formBuilder: FormBuilder, private loginService:LoginService) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    
    
  }

  async login(){
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    let form:iLogin = {
      user: username,
      password: password
    }
    console.log(username);
    console.log(password);
    this.loginService.login(form).subscribe(data => console.log(data));
    
  }

  ngOnInit() {
  }

}
