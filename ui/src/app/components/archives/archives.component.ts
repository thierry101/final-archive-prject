import { Component, Input, OnInit } from '@angular/core';
import { ArchivesService } from 'src/app/services/archives/archives.service';
import { foundToken } from 'src/shared/shared';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

 
  securityObject!:any;
  allServices!:any;
  allArchives!:any;
  allUsers!:any;
  editEl!:boolean;
  itemToEdit!:any;
  title:string = "Ajouter une archive"
  constructor(private archiService:ArchivesService) {
    this.securityObject = foundToken(this.securityObject)
   }

  ngOnInit(): void {
    this.getAllServic()
    this.getAllUse()
    this.getAllArchiv()
  }

  // ************************************************ GET ALL SERVICES ************************************************
  getAllServic(){
    this.archiService.getAllService().subscribe(res=>{
      this.allServices = res
    })
  }


  // ************************************************ GET ALL users ************************************************
  getAllUse(){
    this.archiService.getAllUser().subscribe(res=>{
      this.allUsers = res
    })
  }

  // ************************************************ GET ALL archives ************************************************
  getAllArchiv(){
    this.archiService.getAllArchive().subscribe(res=>{
      this.allArchives = res
    })
  }

  // *********************************************** DELETE ARCHIVE ************************************************************
  deleteItem(item:any){
    if (item) {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui!',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          this.archiService.delArchive(item['id']).subscribe(res=>{
            this.allArchives = this.allArchives.filter((obj: any) => obj !== item)
          })
          Swal.fire(
            'Supprimer!',
            item['name'] + " supprimé avec succès",
            'success'
          )
        }
      })
     
    }
  }

  editArchive(item:any){
    this.title = "Editer une archive"
    this.editEl = true;
    this.itemToEdit = item
  }

}
