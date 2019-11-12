import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { PersonData, ContactRequest } from '../models/peopleRequest';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER_PEOPLE = "http://localhost:3000/people";

  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  

  constructor(private httpClient: HttpClient) { }

  public sendGetRequestPeople()
  {
    return this.httpClient.get(this.REST_API_SERVER_PEOPLE,{  params: new HttpParams({fromString: "_page=1&_limit=20"})}).
                               pipe(retry(4), catchError(this.handleError));
  }

  public registerPerson(newPerson: PersonData){
    let people = [];
    let currentId = 99;
    this.sendGetRequestPeople().subscribe((data:any[])=>{
                                                          people = data;
                                                          if (people.length>0){
                                                            let p:PersonData = people[people.length-1];
                                                            currentId = Number(p.id);
                                                          }
                                                          else{
                                                            currentId = 0;
                                                          }
                                                          newPerson.id = (currentId +1).toString();
                                                        });


    const req= this.httpClient.post(this.REST_API_SERVER_PEOPLE,newPerson).subscribe(r=>{
                                                                                          console.log(r);
                                                                                        },
                                                                                    e=>{
                                                                                          console.log("Error");
                                                                                        });
  }

  public updatePassword(pwd: string, id: number, person: PersonData){
    console.log("update");
    console.log(person);
    this.httpClient.put(this.REST_API_SERVER_PEOPLE + "/" + id, person, { 
                                                                          params: new HttpParams().set('pwd',pwd),
                                                                          headers: new HttpHeaders().set('Authorization','some-token')
                                                                        }).subscribe(r=>{console.log(r);},e=>{console.log(e);});
  }

  public getUser(id: number){
    console.log(id);
    return this.httpClient.get(this.REST_API_SERVER_PEOPLE + "/" + id).pipe(retry(4),catchError(this.handleError));
  }

  parseLinkHeader(header) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
  }

  handleError(error: HttpErrorResponse)
  {
    let errorMessage = 'Unknown Error';
    if (error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    }
    else{
      errorMessage = `Error: ${error.status}\rMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
