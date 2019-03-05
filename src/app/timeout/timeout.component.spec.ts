import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutComponent } from './timeout.component';
import { Component, DebugElement } from '@angular/core';

describe('TimeoutComponent', () => {
  let component: TimeoutComponent;
  let fixture: ComponentFixture<TimeoutComponent>;
  //let duration;
  let modal: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoutComponent);
    component = fixture.componentInstance;
    component.duration = 10;
    component.timeoutmessage = "Your session has expired. Please log in again";
    component.successurl = "http://www.google.com";
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the duration', () => {
    fixture.detectChanges();
    expect(component.IDLE_TIMEOUT).toEqual(component.duration);
  });

  it('should get the timeoutmessage', () => {
    fixture.detectChanges();
    expect(component.timeoutmessage).toEqual(component.timeoutmessage);
  });

  it('should get the cancelurl', () => {
    fixture.detectChanges();
    expect(component.cancelurl).toEqual(component.cancelurl);
  });

  it('should get the successurl', () => {
    fixture.detectChanges();
    expect(component.successurl).toEqual(component.successurl);
  });


  it('duration should not equal the IDLE_TIMEOUT', () => {
    component.duration = 5;
    fixture.detectChanges();
    expect(component.IDLE_TIMEOUT).not.toEqual(component.duration);
  });

  it('IDLE_TIMEOUT should not to be  null', () => {
    fixture.detectChanges();
    expect(component.IDLE_TIMEOUT).not.toBeNull(null);
  });


  it(' _idleSecondsCounter should  to be  zero when click function trigger', () => {
    document.body.click();
    fixture.detectChanges();
    expect(component._idleSecondsCounter).toEqual(0);
  });

  it(' _idleSecondsCounter should  not to be  greater then IDLE_TIMEOUT ', () => {
    fixture.detectChanges();
    expect(component._idleSecondsCounter <= component.IDLE_TIMEOUT).toBeTruthy();
  });

  it(' _idleSecondsCounter is equal to IDLE_TIMEOUT then myInterval should be false ', () => {
    fixture.detectChanges();
    expect(component._idleSecondsCounter == component.IDLE_TIMEOUT).toEqual(false);
  });
 
});