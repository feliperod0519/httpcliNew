import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';


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

  }

  /*
  <script type="text/babel"> 
  const observable = Rx.Observable.create((observer) => { 
    observer.next(1); 
    observer.next(2); 

    setTimeout(() => { 
      observer.next(3); 
      observer.next(4); 
      observer.complete(); 
    }, 1000); 

    observer.next(5); 
  }); 

  console.log('Before subscribe'); 

  observable.subscribe({ 
    next: val => console.log(`Got value ${val}`), 
    error: err => console.log(`Something went wrong ${err}`), 
    complete: () => console.log('I am done') 
  }); 

  console.log('After subscribe'); 
</script> 

let startClick$ = fromEvent(startButton,'click').subscribe(()=>{
  */

}
