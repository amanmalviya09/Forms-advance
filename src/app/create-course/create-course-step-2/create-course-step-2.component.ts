import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createPromoRangeValidator } from '../../validators/date-range-validator';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ['premium',Validators.required],
    price: [null , [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(9999),
      Validators.pattern("[0-9]+")
    ]],
    thumbnail: [null],
    promoStartAt : [null],
    promoEndAt : [null]
  }, {
    validators : [createPromoRangeValidator()],
   // updateOn : 'blur' ---> isint working with thumbnail
  });

  constructor(private fb:FormBuilder){

  }

  ngOnInit() {

    this.form.valueChanges
          .subscribe(val => {
            const priceControl = this.form.controls["price"];

            if(val.courseType == 'free' && priceControl.enabled){
              priceControl.disable({emitEvent:false});
            }
            else if(val.courseType == 'premium' && priceControl.disabled){
              priceControl.enable({emitEvent:false});
            }
          })

  }

}
