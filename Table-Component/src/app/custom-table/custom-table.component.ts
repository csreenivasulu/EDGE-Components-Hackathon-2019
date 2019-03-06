import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { filterTable, tableSorting } from './table.util';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input() TableData: any;
  public showHideInfo = true;
  public copyTableData: any;
  @Input() TableHeadersInfo: Array<any>;
  public tableHeaderKeys: any;
  public tableBodyKeys: any;
  public selectedKey: string;
  public order = -1;
  public form: FormGroup;
  public selectedHeaders;
  public filterArray = {};
  @ViewChild('search') search: ElementRef;
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.selectedHeaders = this.TableHeadersInfo;
    this.form = this._fb.group({
      tableInfo: new FormArray([])
    });
    this.selectAllCheckboxes();
    this.copyTableData = this.TableData;
  }

  /**
   * selectAllCheckboxes method will check based on the input given by the user
   * intially all the checkboxes should checked.
   * */
  public selectAllCheckboxes() {
    this.TableHeadersInfo.map(key => {
      const k = key;
      const control = new FormControl(1);
      (this.form.controls.tableInfo as FormArray).push(control);
    });
  }

  /**
   * @selectedTableHeader Table header Information
   * sorting method should sort the table based on the selectedTableHeader
   * selectTableHeader has the row information and check whether it is selected initially or not
   *  */
  public sorting(selectedTableHeader: any) {
    this.selectedKey = selectedTableHeader;
    const selectedColumn = this.TableHeadersInfo.filter(
      (ele: any) => ele.heading === selectedTableHeader
    )[0];
    console.log(selectedColumn);
    if (this.selectedKey == selectedTableHeader) {
      this.order = -this.order;
    }
    const key = selectedColumn.key;
    tableSorting(this.TableData, key, this.order);
  }

  /**
   * filterTableInfo method should filter the records entered data by user
   * on key press on gloabal search in html it should trigger and it should filter the data
   * based on native element it will get the value entered by the user 
   * */
  public filterTableInfo() {
    const text = this.search.nativeElement.value;
    this.TableData = filterTable(this.copyTableData, text);
  }


  /**
   * @columnName column name details
   * @event details on keypress on column level event details will get.
   * filterByColumn method will call when keypress event trigger in column level input.
   * it will generate filterArray based on input columnname enter user data.
   * */
  public filterByColumn(columnName: string, event: any) {
    const text = event.target.value;
    if (text) {
      this.filterArray[columnName] = text;              
    } else {
      delete this.filterArray[columnName];
    }
    console.log(this.filterArray);
  }

  /**
   * submit method should return the selected headers information.
   * User provided Headers information it should show all the keys based on user preferences. 
   * */
  public submit() {
    const formValue = this.form.value;
    this.selectedHeaders = formValue.tableInfo.map((value: any, id:any) => value ? this.TableHeadersInfo[id] : null).filter((value: any) => value !== null);
    this.showHideInfo = !this.showHideInfo;
  }
}
