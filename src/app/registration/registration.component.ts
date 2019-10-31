import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
  registrationForm: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log('hello');
    this.registrationForm = new FormGroup({ 
                                            firstName: new FormControl('FelipeRod',Validators.required),
                                            lastName: new FormControl(''),
                                            email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEX)])
                                          });
  }

  onSubmit(formValue){
    console.log(formValue);
    console.log(this.registrationForm.value);
  }

}
