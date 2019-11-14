import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, interval, merge } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';

import { LocalStorageServiceService } from '../local-storage-service.service';
import { PersonData } from 'src/models/peopleRequest';

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html',
  styleUrls: ['./behavior-subject.component.css']
})
export class BehaviorSubjectComponent implements OnInit {

  id:number;
  x:number;
  y:number;

  constructor(private localStorageService: LocalStorageServiceService) {
                                                                        
  }

  ngOnInit() {
    const setElementText = (elemId, text) =>  document.getElementById(elemId).innerText = text.toString();
    const addHtmlElement = coords => document.body.innerHTML += `
          <div 
            id=${coords.id}
            style="
            position: absolute;
            height: 30px;
            width: 30px;
            text-align: center;
            top: ${coords.y}px;
            left: ${coords.x}px;
            background: silver;
            border-radius: 80%;">
          </div>`;
    const subject = new BehaviorSubject(0);
    const click$ = fromEvent(document, 'click').pipe(
                          map((e: MouseEvent) => ({ 
                                                    x: e.clientX,
                                                    y: e.clientY,
                                                    id: Math.random() })),
                          tap(addHtmlElement),
                          mergeMap(coords => subject.pipe(tap(v => setElementText(coords.id, v)))
      )
    );
    const interval$ = interval(1000).pipe(
      tap(v => subject.next(v)),
      tap(v => setElementText('intervalValue', v))
    );
    merge(click$, interval$).subscribe();
    //test
    let p: PersonData = new PersonData();
    p.id = "3";
    p.email = "feliperod0519@test.com";
    
    this.localStorageService.storeUserLocalStorage("3",p);
    let p2: PersonData = this.localStorageService.getUserFromLocalStorage("3");
    console.log(p2);
    //test2
  }

  setMyStyles() {
    let styles = {
      'position': 'absolute',
      'top': this.x + 'px',
      'left': this.y + 'px',
      'text-align': 'center',
      'height': '30px',
      'width': '30px',
      'background': 'silver',
      'border-radius': '80%'
    };
    return styles;
  }

}
