import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterColumnPipe } from './custom-table/filter-column.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CustomTableComponent,
        FilterColumnPipe
      ],
      imports: [FormsModule, ReactiveFormsModule]
    })
.compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
