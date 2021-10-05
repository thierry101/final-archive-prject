import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArchivesService } from 'src/app/services/archives/archives.service';

@Component({
  selector: 'app-single-archive',
  templateUrl: './single-archive.component.html',
  styleUrls: ['./single-archive.component.css']
})
export class SingleArchiveComponent implements OnInit {

  id!:number;
  archive!:any;
  files!:any;

  constructor(private route:ActivatedRoute, private archiService:ArchivesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = params.id
      }
    )
    this.showArchiveDetail()
  }

  showArchiveDetail(){
    this.archiService.getArchiveDetail(this.id).subscribe(data =>{
      this.archive = data
      this.files = JSON.parse(data.fileUpload)
      console.log("the id data is ", this.archive)
      console.log("the id file is ", this.files)
    })
  }

}
