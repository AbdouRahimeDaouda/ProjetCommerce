import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {



  }

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      prenomUser: ['', Validators.required],
      nomUser: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      motPasse: ['', Validators.required]

    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSignUp(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value)
      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next:(res) =>{
            alert(res.message)
          },
          error:(err)=>{
            alert(err?.error.message)
          }
        })
    } else{
      console.log("Form invlaid");


      ValidateForm.validateAllFormFields(this.signUpForm)
      alert("Your form is invalid")
    }

  }




}
