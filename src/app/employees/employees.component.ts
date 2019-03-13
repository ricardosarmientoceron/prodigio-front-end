import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../service/data/employees-data.service';
import {Employee} from '../list-employees/list-employees.component';


@Component({
  selector: 'app-root',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  styles: [ '.k-calendar { margin: 0 auto; }' ],
  template: `
  <div class="alert alert-warning" *ngIf="employeeForm.dirty && employeeForm.invalid">Enter valid values</div>
  <div class="alert alert-warning" *ngIf="employeeForm.dirty && name.invalid">Enter valid first name</div>
  <div class="alert alert-warning" *ngIf="employeeForm.dirty && lastName.invalid">Enter valid last name</div>
  
  <form  #employeeForm="ngForm">
  <div class="row example-wrapper">
  <div class="col-xs-12 col-sm-6 example-col">
      <div class="card">
          <div class="card-block">
              <form class="k-form">
                  <label class="k-form-field">
                      <span>First Name</span>
                      <input class="k-textbox"  #name="ngModel" 
                      [(ngModel)]="employee.name" class="form-control" 
                          name="name" required="required" minlength="5" />
                  </label>

                  <div class="example-wrapper">
                  <p>Designation:</p>
                  <kendo-combobox   [(ngModel)]="employee.designation" name="designation" required="required" [data]="listDesignations" [allowCustom]="allowCustom">
                  </kendo-combobox>
                  </div>
                  <div class="example-wrapper">
                  <p>Project:</p>
                  <kendo-combobox [(ngModel)]="employee.project" name="project" required="required" [data]="listProject" [allowCustom]="allowCustom">
                     
                  </kendo-combobox>
                  <div class="col-xs-12 col-sm-6 example-col">
                    <p>Status</p>
                    <kendo-switch name="isActive" required="required" [(ngModel)]="employee.isActive"></kendo-switch>
                 </div>
                

                  </div>
                
              </form>
          </div>
      </div>
  </div>
  <div class="col-xs-12 col-sm-6 example-col">
 
      <div class="card">
          <div class="card-block">
              <form class="k-form-inline">
                  
                  <label class="k-form-field">
                      <span>Last Name</span>
                      <input class="k-textbox" #lastName="ngModel" 
                      [(ngModel)]="employee.lastName" class="form-control" 
                          name="lastName" required="required" minlength="5" />
                  </label>
                  <br />
                  <kendo-calendar name="joiningDate" required="required"  [(ngModel)]="employee.joiningDate">
                 
                  </kendo-calendar>
                  <br />
                  <br />
                  <br />
                  <button class="k-button"   (click)="saveEmployee()">Save</button>
              </form>
          </div>
      </div>
  </div>
</div>
</form> `
})

export class EmployeesComponent implements OnInit {

  id:number
  employee: Employee
  listProject = ['ABC Inc','XYZ','StanChart']
  listDesignations = ['Developer','Project Manager','Senior Developer','Junior Developer','Designer']
  

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private employeeService :EmployeeDataService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    this.employee = new Employee(this.id,'','','','',false,new Date());
    
    if(this.id!=-1) {
      this.employeeService.retrieveEmployee('in28minutes', this.id)
          .subscribe (
            data => this.employee = data
          )
    }
  }

  saveEmployee() {
    if(this.id == -1) { //=== ==
      console.log("esta grabando");
      this.employeeService.createEmployee('in28minutes', this.employee)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['employees'])
            }
          )
    } else {
      console.log("esta actualizando");
      this.employeeService.updateEmployee('in28minutes', this.id, this.employee)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['employees'])
            }
          )
    }
  }


  filterSubById(id) {
    console.log(id);
    return this.subCategories.filter(item => item.parentId === id);
}

}
