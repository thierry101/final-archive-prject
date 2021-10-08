import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { foundToken } from 'src/shared/shared';

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {
  securityObject!:any;
  id!:any;

  constructor(private http:HttpClient) { 
    this.securityObject = foundToken(this.securityObject)
    this.id = this.securityObject['id']
  }

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
  return this.http.get<any>(this.APIUrl + "archive/api/list-archive/")
  }

  getArchiveDetail(id:number){
    return this.http.get<any>(this.APIUrl + "archive/api/archive/"+id+"/")
  }

  delArchive(id:number){
    return this.http.delete<any>(this.APIUrl + "archive/api/archive/"+id+"/")
  }

  addArchive(data:any){
    return this.http.post(this.APIUrl+"archive/api/add-archive/", data)
  }
}
