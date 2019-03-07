import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { GetdataService } from './services/getdata.service';
import { ProductResolver } from './services/product-resolver.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { TruncatePipe } from './shared/truncate.pipe';
import { CartComponent } from './components/cart/cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProductComponent } from './components/product/product.component';
import { RatingComponent } from './components/rating/rating.component';
import { WriteReviewComponent } from './components/rating/write-review/write-review.component';
import { StarRatingComponent } from './components/rating/write-review/star-rating/star-rating.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {path:'', component:ProductListComponent},
  {path:'products', component:ProductListComponent},
  {path:'cart', component:CartComponent},
  {
    path:'product/:id', 
    component:ProductComponent,
    resolve: {
      product: ProductResolver
    }   
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    TruncatePipe,
    CartComponent,
    OrderSummaryComponent,
    ProductComponent,
    RatingComponent,
    WriteReviewComponent,
    StarRatingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GetdataService, ProductResolver, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
