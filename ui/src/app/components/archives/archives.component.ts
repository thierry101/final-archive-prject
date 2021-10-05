import { Component, OnInit } from '@angular/core';
import { ArchivesService } from 'src/app/services/archives/archives.service';
import { foundToken } from 'src/shared/shared';

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

}
