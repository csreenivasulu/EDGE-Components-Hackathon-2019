import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { ScrollComponent } from './scroll/scroll.component';
import { DaterangeComponent } from './daterange/daterange.component';
import { RouteconfComponent } from './routeconf/routeconf.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PagerService } from './_services/index';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';

const routes: Routes = [
  { path: 'home', component: RouteconfComponent },
  { path: 'scroll', component: ScrollComponent },
  { path: 'date', component: DaterangeComponent },
  { path: 'main', component: AppComponent },
  { path: 'pagination', component: PaginationComponent },
  {path: '', redirectTo: 'main', pathMatch: 'full'},
 ];

@NgModule({
  declarations: [
    AppComponent,
    ScrollComponent,
    DaterangeComponent,
    RouteconfComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule
    
  ],
  providers: [PagerService],
  bootstrap: [RouteconfComponent]
})
export class AppModule { }
