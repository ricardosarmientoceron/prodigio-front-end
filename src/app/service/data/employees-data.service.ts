import { TODO_JPA_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../list-employees/list-employees.component';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService  {

  constructor(
    private http:HttpClient
  ) { 
    
  }

  

  retrieveAllEmployees(username) {
    return this.http.get<Employee[]>(`${TODO_JPA_API_URL}/users/${username}/employees`);
    //console.log("Execute Hello World Bean Service")
  }

  deleteEmployee(username, id){
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/employees/${id}`);
  }

  retrieveEmployee(username, id){
    return this.http.get<Employee>(`${TODO_JPA_API_URL}/users/${username}/employees/${id}`);
  }

  updateEmployee(username, id, employee){
    return this.http.put(
          `${TODO_JPA_API_URL}/users/${username}/employees/${id}`
                , employee);
  }

  createEmployee(username, employee){
  console.log(employee,'insertando empleado')
    return this.http.post(
              `${TODO_JPA_API_URL}/users/${username}/employees`
                , employee);
  }

}
