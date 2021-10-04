import { AbstractControl } from "@angular/forms";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl):any {
    let password = abstractControl.get('password1')?.value;
    let confirmPassword = abstractControl.get('password2')?.value;
      if (password != confirmPassword) {
          abstractControl.get('password2')?.setErrors({
            MatchPassword: true
          })
    } else {
      return null
    }
  }
  
}

export function showError(error:any, status:any, table:string[], allErrors:any){
  if (error && status == 400) {
    table = allErrors
    // return table
  }
  else if (status == 500) {
    SwallModal('error', 'Erreur', "Veuillez contacter l'administrateur")
  } 
}

export function toastShow(icon:any, message:string){
  Toast.fire({
    icon: icon,
    title: message
  })
}

export function SwallModal(icons:any, title:string, message:string){
  Swal.fire({
    icon: icons,
    title: title,
    text: message,
    // footer: '<a href="">Why do I have this issue?</a>'
  })
}


export function foundToken(securityObject:any){
  var token = localStorage.getItem('currentUser')
  if (token) {
    securityObject = jwt_decode(token)
    return securityObject
  }
  else{
    let resetSecurityObject= {
      id:"",
      exp:"",
      iat:"",
      username : "",
      name : "",
      surname : "",
      token : "",
      role : "",
      isAuthenticated : false,
    }
    return resetSecurityObject
  }
}

  





export const roles = ["admin", "user", "archiviste", "chef service"]
// pour ajouter une archive il faudra avoir le role chef service
export const genders = ["Masculin", "Feminin"]