import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArchivesService } from 'src/app/services/archives/archives.service';
import { showError, SwallModal, toastShow, foundToken } from 'src/shared/shared';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  archiveFrom!:FormGroup;
  allServices!:any;
  errors!:string[];
  securityObject!:any;


  constructor(private fb:FormBuilder, private cd:ChangeDetectorRef, private archiService:ArchivesService) { }

  ngOnInit(): void {
    this.getAllServices()
    this.archiveFrom = this.fb.group({
      title:['', [Validators.required, Validators.minLength(4)]],
      date:['', [Validators.required]],
      time:['', [Validators.required]],
      service:['', [Validators.required]],
      description:['', [Validators.required, Validators.minLength(5)]],
      fileUpload:this.fb.array([this.uploadFile()]),
      token:foundToken(this.securityObject),
    })
  }

  
  // cette méthode nous permettra de dupliquer les champs
  private uploadFile():FormGroup{
    return this.fb.group({
      titleFile:["", [Validators.required]],
      fileToSend:["", Validators.required],
    })
  };

  public get filesList():FormArray{
    return this.archiveFrom.get('fileUpload') as FormArray;
  }

   // generate field file and description
   addFile():void{
    this.filesList.push(this.uploadFile());
  }

  // delete field generate automatically by addFile
  deleteFile(index:number){
    if(index > 0){
      this.filesList.removeAt(index);
      this.filesList.markAsDirty();
    }
  }

    // listenning event onChange in field img
    public getUploadFile(event:Event | any, index:number):void{
      let reader = new FileReader();
      if(event.target.files && event.target.files.length){
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          // passons les valeurs dynamiquement
          this.archiveFrom.get('fileUpload')?.get(`${index}`)?.patchValue({
            fileToSend: {'name': file.name, 'file':reader.result}
          });
          // let array = this.archiveFrom.get('fileUpload')?.get(`${index}`)?.value
          // console.log("the old path is ", array["titleFile"])
          // if (this.edit && array) {
          //   this.deleteOldFile.push(this.checkPathToDelete[index])
          //   // console.log("the path to add ", this.deleteOldFile)
          //   // console.log("the path before ", this.deleteOldFile)
          // }
          
          this.cd.markForCheck();
  
        }
      }
    }

    // ************************************************ GET ALL SERVICES ************************************************
    getAllServices(){
      this.archiService.getAllService().subscribe(res=>{
        this.allServices = res
      })
    }

  registerArchive(){
    if(this.archiveFrom.get("token")?.value === null){
      SwallModal('info', "Erreur", "Vous devez être conntecté pour enregistrer une archive")
    }
    else{
      this.archiService.addArchive(this.archiveFrom.value).subscribe(res=>{
        console.warn(res)
        if (res) {
          toastShow("success", "Archive enregistrée avec succès")
          this.errors = []
          this.ngOnInit()
        }
      },
      (error=>{
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
      
    }
  }

}
