import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

  title:string = "Ajouter une archive"
  constructor() { }

  ngOnInit(): void {
  }

}
