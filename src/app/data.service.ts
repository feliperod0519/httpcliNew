import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

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

//{  params: new HttpParams({fromString: "_page=1&_limit=20"})}

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
