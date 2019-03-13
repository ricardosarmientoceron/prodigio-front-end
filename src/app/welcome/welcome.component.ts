import { WelcomeDataService } from './../service/data/welcome-data.service';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import {Employee} from './../list-employees/list-employees.component';
import { EmployeeDataService } from '../service/data/employees-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  message = 'Welcome to employees portal Synechron'
  welcomeMessageFromService:string
  name = ''
  employees: Employee[]
  
  constructor(
/*     private route:ActivatedRoute, */
    private router : Router,
    private service:WelcomeDataService,
    private employeesService:EmployeeDataService,) { 

  }

  ngOnInit(){
   
    /* this.name = this.router.snapshot.params['name']; */
    this.refreshEmployees();
    
  }

  getWelcomeMessage() {
    
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    
  }

  getWelcomeMessageWithParameter() {
    
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    
  }

  handleSuccessfulResponse(response){
    this.welcomeMessageFromService = response.message
  }

  handleErrorResponse(error) {
    this.welcomeMessageFromService = error.error.message
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

