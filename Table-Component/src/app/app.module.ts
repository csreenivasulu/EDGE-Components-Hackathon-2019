import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { FilterColumnPipe } from './custom-table/filter-column.pipe';

@NgModule({
  declarations: [AppComponent, CustomTableComponent, FilterColumnPipe],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
