import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FbFeedComponent } from './fb-feed.component';

describe('FbFeedComponent', () => {
  let component: FbFeedComponent;
  let fixture: ComponentFixture<FbFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbFeedComponent ],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
