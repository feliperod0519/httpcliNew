import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, of, from } from 'rxjs';
import { takeUntil, mergeMap, map, delay, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.css']
})
export class MouseComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('.my-canvas');
    const ctx = canvas.getContext('2d');

    let infiniteX = Infinity;
    let infiniteY = Infinity;
    let colorHue = 0;

    this.initialize(canvas,ctx);

    const move$ = fromEvent<MouseEvent>(document, 'mousemove');
    const down$ = fromEvent(document, 'mousedown')
    const up$ = fromEvent(document, 'mouseup')

    const paints$ = down$.pipe(
                                mergeMap(down => move$.pipe(takeUntil(up$)))
                              );
    
    move$.subscribe((event)=>{
                                ctx.strokeStyle= `hsl(${colorHue}, 100%, 60%)`;
                                ctx.beginPath();
                                if (Math.abs(infiniteX - event.clientX)<100 && Math.abs(infiniteY - event.clientY)<100){
                                  ctx.moveTo(infiniteX,infiniteY);
                                }
                                ctx.lineTo(event.clientX,event.clientY);
                                ctx.stroke();
                                infiniteX= event.clientX;
                                infiniteY= event.clientY;
                                colorHue++;
                        });
    this.exampleMap();
    this.exampleMergeMap();                   
    
  }

  initialize(canvas: HTMLCanvasElement,ctx) {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 70;
  }

  exampleMap(){
    const data = of([
      {
        brand: 'porsche',
        model: '911'
      },
      {
        brand: 'porsche',
        model: 'macan'
      },
      {
        brand: 'ferarri',
        model: '458'
      },
      {
        brand: 'lamborghini',
        model: 'urus'
      }
    ]);
    /*
    For each value that the Observable emits you can apply a function in which you can modify the data. 
    The return value will, behind the scenes, be reemitted as an Observable again so you can keep using it in your stream.
    */
    const ex$ = data.pipe(
                          map(cars => cars.map(
                                                car => `${car.brand} ${car.model}`
                                              )
                             )
                         );
    ex$.subscribe(cars=>console.log(cars));
    data.pipe(
              map(cars => cars.filter(car => car.brand === 'porsche'))
             ).subscribe(cars => console.log(cars));
  }


  exampleMergeMap(){
    /*
    MergeMap essentially is a combination of mergeAll and map. MergeAll takes care of subscribing to the
    ‘inner’ Observable so that we no longer have to Subscribe two times as mergeAll merges the value of the ‘inner’ 
    Observable into the ‘outer’ Observable. 
    */

    /*
    It is important to note the difference between of and from when passing an array-like structure (including strings):

      Observable.of([1, 2, 3]).subscribe(x => console.log(x));
      would print the whole array at once.
      On the other hand,
      Observable.from([1, 2, 3]).subscribe(x => console.log(x));
      prints the elements 1 by 1.
      For strings the behaviour is the same, but at character level.
    */
    const getMockedData = (param) => {
                                           return of(`retrieved new data with param ${param}`).pipe(
                                                                                                    delay(2000)
                                                                                                   )
                                     }
    of([1,2]).subscribe(x=>console.log(`Hello ${x}`));                             
    from([1,2]).subscribe(x=>console.log(`World ${x}`));

    console.log('map');
    from([1,2,3,4]).pipe(
                          map(param => getMockedData(param))
                        ).subscribe(val => val.subscribe(data => console.log(data)));
    console.log('MergeAll');
    from([1,2,3,4]).pipe(
                          map(param => getMockedData(param)),
                          mergeAll()
                        ).subscribe(val => console.log(val));
    console.log('MergeMap');
    from([1,2,3,4]).pipe(
                          mergeMap(param => getMockedData(param))
                        ).subscribe(val => console.log(val));
    
    
  }
}

/*


// get data as brand+model string. Result: 
// ["porsche 911", "porsche macan", "ferarri 458", "lamborghini urus"]
data
  .pipe(
    map(cars => cars.map(car => `${car.brand} ${car.model}`))
  ).subscribe(cars => console.log(cars))

// filter data so that we only have porsches. Result:
// [
//   {
//     brand: 'porsche',
//     model: '911'
//   },
//   {
//     brand: 'porsche',
//     model: 'macan'
//   }
// ]
data
  .pipe(
    map(cars => cars.filter(car => car.brand === 'porsche'))
  ).subscribe(cars => console.log(cars))
*/