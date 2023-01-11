import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";
    loginForm!: FormGroup;


    constructor(private fb: FormBuilder, private auth: AuthService) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        motPasse: ['', Validators.required]

      })

    }
    hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
    }

    onSubmit(){
      if(this.loginForm.valid){
        this.auth.login(this.loginForm.value)
          .subscribe({
            next:(res) =>{
              alert(res.message)
            },
            error:(err)=>{
              alert(err?.error.message)
            }
          })
        console.log(this.loginForm.value)
      } else{
        console.log("Form invlaid");


        ValidateForm.validateAllFormFields(this.loginForm)
        alert("Your form is invalid")
      }

    }



}
