import { AbstractControl } from "@angular/forms";

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

export function showPassword(error:any, status:any, table:string[], allErrors:any){
  if (error && status == 400) {
    table = allErrors
    // return table
  }
  else if (status == 500) {
    alert("Veuillez contacter l'administrateur")
    // return "ee"
  } 
}


  





export const roles = ["admin", "user", "archiviste", "chef service"]
// pour ajouter une archive il faudra avoir le role chef service
export const genders = ["Masculin", "Feminin"]