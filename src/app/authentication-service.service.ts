import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PersonData } from '../models/peopleRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private currentUserSubject: BehaviorSubject<PersonData>;
  public currentUser: Observable<PersonData>;

  constructor(private http: HttpClient) { 
     this.currentUserSubject = new BehaviorSubject<PersonData>(new PersonData);
     this.currentUser = this.currentUserSubject.asObservable();
  }
}
