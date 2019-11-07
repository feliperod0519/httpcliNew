import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

const STORAGE_KEY = "local_todolist";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  anotherTodolist = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, 
              @Inject(SESSION_STORAGE) private sessionStorage: StorageService) 
  { }

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

}
