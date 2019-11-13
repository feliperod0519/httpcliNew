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
      
      let id: number = 3;
      let pwd: string = "hello1";                                                               
      this.dataService.getUser(id).pipe(takeUntil(this.destroy$))
                                 .subscribe(data=>{
                                                            this.updatePeople = data;
                                                            console.log(this.updatePeople);
                                                            this.updatePeople.pwd = pwd;
                                                            console.log(":)");
                                                            this.dataService.updateInfo(3,this.updatePeople);
                                                          });
      

      let searchEmail: string = "feliperod0519@gmail.com";                                                  
      this.dataService.sendGetRequestPeople().pipe(takeUntil(this.destroy$))
                                                          .subscribe((data:any[])=>{
                                                                                      let p = [];
                                                                                      p=data;
                                                                                      let f= p.find((e: PersonData)=>{
                                                                                                                        return e.email===searchEmail;
                                                                                                                     });
                                                                                      console.log(":[|]");
                                                                                      console.log(f);
                                                                                      console.log(":[|]");
                                                                                   });                                                     
      /*
          var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function(element) {
  return element > 10;
});

console.log(found);
// expected output: 12
      */
      
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
