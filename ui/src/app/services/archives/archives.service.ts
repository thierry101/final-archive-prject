import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "http://127.0.0.1:8000/";

  // ********************** get all service *****************************
  getAllService(){
    return this.http.get(this.APIUrl + "archive/api/list-service/")
  }

  // ********************** get all user **********************************
  getAllUser(){
    return this.http.get(this.APIUrl + "archive/api/list-user/")
  }

  
  // ********************** get all Archives **********************************
  getAllArchive(){
  return this.http.get(this.APIUrl + "archive/api/list-archive/")
  }

  getArchiveDetail(id:number){
    return this.http.get<any>(this.APIUrl + "archive/api/archive/"+id+"/")
  }

  addArchive(data:any){
    return this.http.post(this.APIUrl+"archive/api/add-archive/", data)
  }
}
