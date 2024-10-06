import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  userform!:FormGroup
  constructor(_fb:FormBuilder){
    this.userform=_fb.group({
      fname:['', [Validators.required]],
      age:[''],
      mnum:['',[Validators.required,Validators.minLength(10), Validators.maxLength(10)]]
    })
  }

  register(){
    console.log("values recieved");
    console.log(this.userform.value);
    this.userform.reset()    
  }
}
