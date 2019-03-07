import { Component, OnInit, Input} from '@angular/core';
import { GetdataService } from '../../services/getdata.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() public item;
  public finalRating: number = 0;
  constructor(private getdataService: GetdataService) { }

  ngOnInit() {
    this.getdataService.getRating(this.item)
  }

  //Like review
  likeReview(i){
    this.getdataService.funcLikeReview(this.item.id, i)
  }
  
  //dislike review
  dislikeReview(i){
    this.getdataService.funcDislikeReview(this.item.id, i)
  }
}
