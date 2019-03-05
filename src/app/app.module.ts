
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { TimeoutComponent } from './timeout/timeout.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    TimeoutComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [TimeoutComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const timeoutNotification = createCustomElement(TimeoutComponent, {
      injector
    });
    customElements.define('timeout-notification', timeoutNotification);
  }

  ngDoBootstrap() { }
}