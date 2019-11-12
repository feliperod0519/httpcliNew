import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PersonData } from 'src/models/peopleRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  people= [];
  updatePeople: any;
  currentId = -1;
  destroy$:Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() 
  {
      this.dataService.sendGetRequestPeople().pipe(takeUntil(this.destroy$))
                                             .subscribe((data:any[])=>{
                                                                        console.log(data);
                                                                        this.people = data;
                                                                        if (this.people.length>0){
                                                                          let p:PersonData = this.people[this.people.length-1];
                                                                          this.currentId = Number(p.id);
                                                                        }
                                                                        else{
                                                                          this.currentId = 0;
                                                                        }
                                                                      });
                                                                 
      this.dataService.getUser(3).pipe(takeUntil(this.destroy$))
                                 .subscribe(data=>{
                                                            this.updatePeople = data;
                                                            console.log(this.updatePeople);
                                                            
                                                              
                                                            console.log(":)");
                                                            this.dataService.updatePassword("world",3,this.updatePeople);
                                                          });
                                               
      //this.dataService.getUser(3).subscribe()
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
