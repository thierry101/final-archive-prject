import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { roles, genders, ValidatePassword, showError } from 'src/shared/shared'

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  title:string="PAGE DE CONNEXION";;
  loginChoice:boolean=true;
  genders!:string[];
  roles!:string[];
  registerFrom!:FormGroup;
  errors!:string[];
  credential = {
    username : "",
    password: "",
  }

  constructor(private fb:FormBuilder, private auth:AuthService) { }

  ngOnInit(): void {
    this.roles = roles;
    this.genders = genders;
    this.registerFrom = this.fb.group({
      username:['', [Validators.required, Validators.minLength(4)]],
      name:['', [Validators.required, Validators.minLength(2)]],
      surname:['', [Validators.required, Validators.minLength(2)]],
      email:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      gender:['', [Validators.required]],
      role:['', [Validators.required]],
      passwordGroup : this.fb.group({
        password1:['', [Validators.required, Validators.minLength(6)]],
        password2:['', [Validators.required]],
      }, {validator: ValidatePassword.MatchPassword})
    })
  }

  get myForm() {
    return this.registerFrom.controls;
  }
  
  registerUser(){
    this.auth.registerUser(this.registerFrom.value).subscribe(res=>{
      if (res == 'user created') {
        alert("Utilisateur créé avec succès");
        this.ngOnInit();
        
      }
    },
    (error=>{
      if (error && error.status == 400) {
        this.errors = error.error
      }
      else if (error.status == 500) {
        alert("Veuillez contacter l'administrateur")
      } 
    })
    )
  }

  loginUser(){
    this.auth.login(this.credential).subscribe(res => {
      if (res['token']) {
        // redirect user
        // console.warn("the login are ", res['token'])
      }
    },(error =>{
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    })
    )
  }


  choiceRegister(){
    this.title = "PAGE D'ENREGISTREMENT";
    this.loginChoice = false;
    this.ngOnInit();
    this.errors = [];
  }

  choiceLogin(){
    this.title = "PAGE DE CONNEXION";
    this.loginChoice = true;
    this.ngOnInit();
    this.errors=[];
  }

  showPassword(){
    var element = document.querySelector('#inputPassword4');
    var dataAttribute = element?.getAttribute('type');
    if(dataAttribute=='password'){
      element?.setAttribute('type', 'text')
    }else{
      element?.setAttribute('type', 'password')
    }
  }

}
