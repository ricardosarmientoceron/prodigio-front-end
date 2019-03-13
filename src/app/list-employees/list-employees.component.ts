import { EmployeeDataService } from '../service/data/employees-data.service';
import { Component, OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult ,} from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { process, State } from '@progress/kendo-data-query';

export class Employee {
  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public project: string,
    public designation: string,
    public isActive: boolean,
    public joiningDate: Date
  ){

  }
}

@Component({
  selector: 'app-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
  template: `
  

  <div class="container">
  <h1> Employees Portal </h1>
    <div class="row">
      <button  kendoButton (click)="addEmployee()" class="btn btn-success">
         Add New
      </button>
    </div>
    <kendo-grid   
    
    
    [kendoGridBinding]="employees" [height]="410"
    [pageable]="{
      buttonCount: buttonCount,
      info: info,
      type: type,
      pageSizes: [5, 10, 20],
      previousNext: previousNext
    }"
    [sortable]="true"
    [groupable]="true"
    [filterable]="true"
    [pageSize]="10"
    
    >
   <kendo-grid-column field="Id">
      <ng-template kendoGridCellTemplate let-dataItem>
        <div>
            {{ dataItem.id }}
        </div>
      </ng-template>
    </kendo-grid-column>
    <kendo-grid-column field="Name / Designation">
     <ng-template kendoGridCellTemplate let-dataItem>
      <div>
          {{ dataItem.name }}
          <br>
          {{ dataItem.designation }}
      </div>
     </ng-template>
    </kendo-grid-column>
    <kendo-grid-column field="Project">
     <ng-template kendoGridCellTemplate let-dataItem>
      <div>
          {{ dataItem.project }}
      </div>
     </ng-template>
    </kendo-grid-column>
    <kendo-grid-column field="Date of Joining">
      <ng-template kendoGridCellTemplate let-dataItem>
        <div>
            {{dataItem.joiningDate | date | uppercase}}
        </div>
      </ng-template>
    </kendo-grid-column>
    <kendo-grid-column field="Status">
        <ng-template kendoGridCellTemplate let-dataItem>
          <div>
              {{dataItem.active}}
          </div>
        </ng-template>
    </kendo-grid-column>
    <kendo-grid-column field="Action">
      <ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex">
          <button type="button" class="k-button" (click)="updateEmployee(dataItem.id)">Update</button>
      </ng-template>
    </kendo-grid-column>
  
  </kendo-grid> 
  </div>
 
  
  
 
  

`,
styles: [`

`]
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[]
  
  message: string
 
  constructor(
    private employeesService:EmployeeDataService,
    private router : Router
  ) { }


  

  ngOnInit() {
   /// console.log(`cargando al partir` )
    this.refreshEmployees();
  }

  refreshEmployees(){
    this.employeesService.retrieveAllEmployees('in28minutes').subscribe(
      response => {
        console.log(response);
        this.employees = response;
      }
    )
  }

  deleteEmployee(id) {
    console.log(`delete employee ${id}` )
    this.employeesService.deleteEmployee('in28minutes', id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of Employee ${id} Successful!`;
        this.refreshEmployees();
      }
    )
  }

  updateEmployee(id) {
    console.log(`update ${id}`)
    this.router.navigate(['employees',id])
  }

  addEmployee() {
    this.router.navigate(['employees',-1])
  }
}
