import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableComponent } from './custom-table.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { FilterColumnPipe } from './filter-column.pipe';
import { tableSorting } from './table.util';


describe('CustomTableComponent', () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTableComponent,FilterColumnPipe ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    component.TableHeadersInfo = [{name: "sai"}];
    fixture.detectChanges();
  });

  it('should create', () => {
    component.TableHeadersInfo = [{name: "sai"}];
    expect(component).toBeTruthy();
  });

  it('should called sorting method', () => {
    component.TableHeadersInfo = [
      { heading: 'Id', key: 'id' },
      { heading: 'User Id', key: 'userId' },
      { heading: 'Title', key: 'title' },
      { heading: 'Description', key: 'body' }
    ];
    component.TableData = [{id: "a",}, {id: "c"}, {id: "b"}];
    const header = 'Id';
    component.order = 1;
    fixture.detectChanges();
    expect(component.sorting(header)).toBeUndefined();
  });

  it('should call filterTableInfo method', () => {
    component.TableData = [{id: "abc",}, {id: "cccc"}, {id: "ba"}];
    const text = "a";
    component.copyTableData = component.TableData;
    expect(component.filterTableInfo()).toBeUndefined();
  });

  it('should call filterByColumn method', () => {
    const event = {target: {value : "abc"}};
    const columnName = "id";
    expect(component.filterByColumn(columnName,event)).toBeUndefined();
  });

  it('should call filterByColumn method by null value', () => {
    component.filterArray = {id: "aaa"};
    const event = {target: {value : ""}};
    const columnName = "id";
    expect(component.filterByColumn(columnName,event)).toBeUndefined();
  });

  it('should call the submit method', () => {
    component.showHideInfo = true;
    component.selectedHeaders = [{ heading: 'Id', key: 'id' },
    { heading: 'User Id', key: 'userId' },
    { heading: 'Title', key: 'title' },
    { heading: 'Description', key: 'body' }];
    expect(component.submit()).toBeUndefined();
  });

  it('should call the submit method all values are missing', () => {
    component.showHideInfo = true;
    const formValue = [false, false];
    const expectOp = undefined;
    component.form.controls['tableInfo'].patchValue(formValue);
    expect(component.submit()).toBe(expectOp);
  });
});
