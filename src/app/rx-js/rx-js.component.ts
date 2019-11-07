import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, of, from } from 'rxjs';
import { mergeMap, delay, map } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-rx-js',
  templateUrl: './rx-js.component.html',
  styleUrls: ['./rx-js.component.css']
})
export class RxJSComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const myObservable = Observable.create((x)=>{
                                                  x.next(1);
                                                  x.next(2);
                                                  setTimeout(()=>{
                                                                    x.next(3);
                                                                    x.next(4);
                                                                    x.complete();
                                                                 },1000);
                                                  x.next(5);
                                                });
    console.log('Before subscribe');
    myObservable.subscribe({ 
      next: val => console.log(`Got value ${val}`), 
      error: err => console.log(`Something went wrong ${err}`), 
      complete: () => console.log('I am done') 
    }); 
    console.log('After subscribe');
    
    let mouseMoves$ = fromEvent<MouseEvent>(document,'mousemove');
    mouseMoves$.subscribe(event => console.log(event.clientX,event.clientY));

    const saveLocation = location => {
                                        return of(location).pipe(delay(500));
                                     };

    const API_URL = "http://jsonplaceholder.typicode.com/todos/1";
    
    const click$ = fromEvent<MouseEvent>(document,'click');
    
    let x = click$.pipe(
                  mergeMap((e:MouseEvent)=>{
                                              return of({
                                                        x: e.clientX,
                                                        y: e.clientY,
                                                        t: Date.now()
                                                        }).pipe(delay(500));
                                           })
               ).subscribe(r=>console.log(r));
    x.unsubscribe();

    click$.pipe(mergeMap(()=>ajax.getJSON(API_URL))).subscribe(r=>console.log(r));

    const myPromise = v => new Promise(resolve => resolve(`${v}`));
    const source$ = of("Hello");
    source$.pipe(mergeMap(v=>myPromise(v))).subscribe((v)=>console.log(v));
    
    const source_2$ = 
    of("World").pipe(map(v=>from(myPromise(v)).subscribe(v=>v))).subscribe((v)=>console.log(v));

  }

}
