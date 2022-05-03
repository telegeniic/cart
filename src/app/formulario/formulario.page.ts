import { Component, OnInit } from '@angular/core';
import  {FormGroup, FormBuilder, Validators}  from "@angular/forms";
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  ionicForm: FormGroup;
  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

}
