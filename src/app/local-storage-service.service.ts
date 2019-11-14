import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { PersonData } from 'src/models/peopleRequest';

const LOCAL_STORAGE_KEY = "local_users";
const SESSION_STORAGE_KEY = "session_users";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  //anotherTodolist = [];
  localData = [];
  sessionData = []; 

  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService, 
              @Inject(SESSION_STORAGE) private sessionStorage: StorageService) 
  { }
  
  /*
  public storeOnLocalStorage(taskTitle: string): void {
    console.log(';/');
    const currentTodoList = this.storage.get(STORAGE_KEY) || [];
    const otherCurrentTodoList = this.sessionStorage.get(STORAGE_KEY) || [];
    currentTodoList.push({
        title: taskTitle,
        isChecked: false 
    });
    otherCurrentTodoList.push({
      title: taskTitle,
      isChecked: true 
    });
    this.storage.set(STORAGE_KEY, currentTodoList);
    this.sessionStorage.set(STORAGE_KEY,otherCurrentTodoList);
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
    console.log(this.sessionStorage.get(STORAGE_KEY) || 'Session storage is empty');
  }
  */

  public storeUserLocalStorage(userId: string, person: PersonData)
  {
      if (this.localStorage.get(userId)==null){
        this.localData = [];
      }
      this.localData.push(person);
      this.localStorage.set(userId,person);
  }

  public storeUserSessionStorage(userId:string, person: PersonData)
  {
    if (this.sessionStorage.get(userId)==null){
      this.sessionData = [];
    }
    this.sessionData.push(person);
    this.sessionStorage.set(userId,person);
  }

  public getUserFromLocalStorage(userId:string):PersonData{
    let newPerson: PersonData;
    newPerson = this.localStorage.get(userId);
    return newPerson;
  }

  public getUserFromSessionStorage(userId:string):PersonData{
    let newPerson: PersonData;
    newPerson = this.sessionStorage.get(userId);
    return newPerson;
  }

  public removeUser(userId:string){}
/*
  public getUserFromSessionStorage(userId:string):PersonData{

  }
*/
}
