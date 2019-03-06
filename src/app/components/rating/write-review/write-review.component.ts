import { Component, OnInit, Input } from '@angular/core';
import { WriteReviewModel } from './write-review.model';
import { WriteReviewService } from './write-review.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {
  @Input() public item;
  private getIndex:number;
  private message : WriteReviewModel;

  private isPopupVisible: boolean = false;
  private isAddPopupVisible: boolean = false;
  private isCancelPopupVisible: boolean = false;
  private userRating:number = 0; //no rating
  private timeOfPost:number = Date.now();
  private userGender:string = 'male';
  // form Elem
  reviewForm: FormGroup;
  get f() { return this.reviewForm.controls; }
  //form Elements defined
  get reviewTitle() { return this.reviewForm.get('reviewTitle')}
  get review() { return this.reviewForm.get('review')}
  get name() { return this.reviewForm.get('name')}
  get email() { return this.reviewForm.get('email')}

  //list of pattern
  private pattern_email = "^[a-zA-Z0-9]{3,}$"; //alphanumeric

  constructor(
    private WriteReviewService: WriteReviewService, 
    private fb: FormBuilder, 
    private GetDataService: GetdataService,
    private datePipe: DatePipe
  ) { 
  }

  ngOnInit() {
    this.getIndex = this.item.id;
    this.loadReviewForm();
  }

  loadReviewForm(){
    this.reviewForm = this.fb.group({
      reviewTitle:['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      review:['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      recommendation: ['true'],
      name: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.pattern(this.pattern_email)]],
      gender: ['true']
    });
  }

  //get gender of the user
  getGender(g){
     if (g){
      this.userGender = 'male'
     } else {
       this.userGender = 'female'
     }
  }
  onSubmit(){
    this.hidePopup();
    this.getGender(this.reviewForm.value.gender);
    let payload ={
      "rating": this.userRating,
      "title": this.reviewForm.value.reviewTitle,
      "message": this.reviewForm.value.review,
			"recommendation": this.reviewForm.value.recommendation,
			"name": this.reviewForm.value.name,
      "email": this.reviewForm.value.email,
      "gender": this.userGender,
      "timeOfPost": this.timeOfPost
    }
    console.log(payload)
    this.GetDataService.funcPostReview(this.getIndex, payload)    
  }

  showPopup() {this.loadReviewForm();this.isPopupVisible = true; this.isAddPopupVisible = true}
  hidePopup() {
    this.isPopupVisible = false;
    this.isAddPopupVisible = false;
    this.isCancelPopupVisible = false;    
  }

  getCloseConfirm(){ //get confirmation for discarding the change
    this.isAddPopupVisible = false;
    this.isCancelPopupVisible = true;    
  }

  onDiscardTrue(){ //When user wants to close the popup
    this.hidePopup();
  }
  
  onDiscardFalse(){ //When user doesnot want to close the popup
    this.isCancelPopupVisible = false;  
    this.isAddPopupVisible = true;
    
  }

  getUserRating(item: any): void {
    this.userRating = item.rating;
  }

}
