import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PersonData } from '../models/peopleRequest';
import { DataService } from '../app/data.service';

import { LocalStorageServiceService } from '../app/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private currentUserSubject : BehaviorSubject<PersonData>;
  public currentUser: Observable<PersonData>;

  constructor(private http: HttpClient, 
              private dataService: DataService, 
              private storage: LocalStorageServiceService) 
  { 
      this.currentUserSubject = new BehaviorSubject<PersonData>(new PersonData());
      this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email:string, password:string){
    let searchEmail: string = email;                                                  
    this.dataService.sendGetRequestPeople().subscribe((data:any[])=>{
                                                                      let p = [];
                                                                      p=data;
                                                                      let f: PersonData = p.find((e: PersonData)=>{
                                                                                                                    return e.email===searchEmail;
                                                                                                                  });
                                                                      if (f!=null){
                                                                        if (f.pwd === password){
                                                                          this.storage.storeUserLocalStorage(f.id,f);
                                                                          this.currentUserSubject.next(f);
                                                                          return f;
                                                                        }
                                                                        else{    
                                                                          return new PersonData();
                                                                        }
                                                                      }
                                                                      console.log(f);
                                                                    });
  }

  logout(){

  }
}
