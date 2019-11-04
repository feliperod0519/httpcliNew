import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PersonData, ContactRequest } from '../../models/peopleRequest'

import { DataService } from '../data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
  registrationForm: FormGroup;

  countries = ["Indonesia","Comore Islands","Canada"];
  requestType = ["None", "Unknown", "Claim"];

  selectedCountry:string = "";

  constructor(private formBuilder: FormBuilder, private dataService: DataService) 
  { 
      this.registrationForm = this.createFormGroup_1(formBuilder);
  }

  ngOnInit() {
    console.log('hello'); 
  }

  createFormGroup_1(formBuilder:FormBuilder){
      return formBuilder.group({
                                  personalData: formBuilder.group(new PersonData()),
                                  requestType:'',
                                  text:''
                              });
  }

  /*
  const result: ContactRequest = Object.assign({}, this.contactForm.value);
    result.personalData = Object.assign({}, result.personalData);
  */

  onSubmit(){
    console.log("onsubmit");
    const result: ContactRequest = Object.assign({},this.registrationForm.value);  
    result.personalData = Object.assign({},result.personalData);
    console.log(result);
    this.dataService.registerPerson(result.personalData);
  }

  revert(){
    console.log("revert");
    this.registrationForm.reset();
    this.registrationForm.reset({
                                  personalData: new PersonData(),
                                  requestType:'',
                                  text:''
                                });
  }

  get selectedCountryMod(){
    return this.selectedCountry;
  }

  set selectedCountryMod(value){
    console.log(value);
    this.selectedCountry = value;
  }
}
