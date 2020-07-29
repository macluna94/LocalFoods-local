import { LoginModel } from './data-login';
import { DataLocal } from './data-local';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TlocalService {

  url = "http://localhost:5000/api/"
  urlProxy= '/api/local/'
  constructor(private http:HttpClient) { }

  headers = new HttpHeaders().set('Content-Type','application/json');

  sendRegister(datos: DataLocal){
    let data = JSON.stringify(datos)
    return this.http.post(this.urlProxy+'register', data, { headers: this.headers})

  }
  sendLogin(datos: LoginModel){
    let data = JSON.stringify(datos)
    return this.http.post(this.urlProxy+'login', data, { headers: this.headers})
  }
  
  findLocal(id: string ) {
    return this.http.get(this.urlProxy+id)
  }
  

  uploadImage(base46: string){
    let data = {
      dataImage: base46,
      contentTypeImage: "image/jpg"
    }
    let headers = new HttpHeaders().set('Content-Type','image/jpeg');

    
    return this.http.post('/api/local/upload', data,{headers:headers})
  }



}
