import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "http://127.0.0.1:8000/";

  getAllService(){
    return this.http.get(this.APIUrl + "archive/api/list-service/")
  }

  addArchive(data:any){
    return this.http.post(this.APIUrl+"archive/api/add-archive/", data)
  }
}
