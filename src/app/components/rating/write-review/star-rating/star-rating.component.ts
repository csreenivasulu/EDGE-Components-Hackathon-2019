import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent{
  rating:number=0;
  hoverRating:number=0;
  ratingParam:any=[
    {'star': 1, 'title': 'Very Poor'},
    {'star': 2, 'title': 'Poor'},
    {'star': 3, 'title': 'Good'},
    {'star': 4, 'title': 'Very Good'},
    {'star': 5, 'title': 'Excellent'}
  ]
  @Output() userRating: EventEmitter<any> = new EventEmitter<any>();

  getUserRating(rating: number): void {
    this.rating = rating;
    this.hoverRating = this.rating;
    this.userRating.emit({
      rating: rating
    });
  }
}