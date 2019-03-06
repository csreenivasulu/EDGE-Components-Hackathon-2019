# EDGE-Components-Hackathon-2019
# Table Component

The Table component is useful for creating custom table which having features like searching, sorting & hide/show the columns. 

<p align="center">
  <img width="800" height="400" src="https://github.com/ERS-HCL/EDGE-Components-Hackathon-2019/blob/ERSEDGE022019036/Image/TableComponent.png">
</p>

### To preview demo of Table component, [Click here](https://angular-wwpb6g.stackblitz.io/)

## Using the complete angular project
Download the Table Component folder and install the required packages and run the application.

### Installing

```
 > npm install
```

### Run server

```
 > ng serve
```
#### For better appearance install bootstrap4 and font-awesome.

### HOW TO USE ?

#### 1. Provide the JSON data
Provide the JSON data for creating the table with unique key values

#### 2. Searching
There are two types of searching mechanisms are available here i.e global level search and column level search

#### 3. Sorting
Sorting feature is available with ascending and descending order

#### 4. Hide and Show the columns
User can hide/show the specific columns by using the checkboxes which are given at the top section

#### 5. Filter the content
To filter the column level data user should add the filter-column pipe into app.module.ts
```
import { FilterColumnPipe } from './custom-table/filter-column.pipe';
```
In declarations add like below syntax
```
declarations: [FilterColumnPipe]
```

### Pass the data to table component as mentioned below

```html
<app-custom-table  [TableData]="tableInfo"  [TableHeadersInfo]="tableHeadersInfo"></app-custom-table>
```
#### Input Decorator Description

##### 1. TableData is an input decorator which will pass the Table data Information to component.

##### 2. TableHeadersInfo is an input decorator which will pass the Header Information to component.

#### Example of Input Decorators
```typescript
public tableInfo = [{name: "abc" , age: 23}, {name: "cdf", age:55}]
public tableHeadersInfo = [{heading: "Name", key: "name"}, {heading: "Age", key:"age"}]
```






