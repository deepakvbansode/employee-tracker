import { ITask, IHistory, IAddHistoryRequest } from './../models/app.models';
import { IPurpose, IEmployee } from './../app.models';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
  private taskCollection: AngularFirestoreCollection<ITask>;
  private task: AngularFirestoreDocument<ITask>
  private tasks$: Observable<ITask[]>;

  private employeeCollection: AngularFirestoreCollection<IEmployee>;
  private employee: AngularFirestoreDocument<IEmployee>;
  private employees$: Observable<IEmployee[]>;

  constructor(private afs: AngularFirestore) {
    this.initTasks();
    this.initEmpoyee();
  }

  //-------------------Start Tasks-----------
  private initTasks(){
    this.taskCollection = this.afs.collection('tasks');
    this.tasks$ = this.taskCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data } as ITask;
      });
    });
  }

  getTasks(){
    return this.tasks$;
  }

  addTask(task:ITask){
    return this.taskCollection.add(task);
  }
  addTaskHistory(request: IAddHistoryRequest){
    return this.afs.collection('tasks/'+request.taskId+'/testing').add(request.activity);
  }


  updateTask(task:ITask){
    let taskId = task.id;
    delete task.id;
    this.task = this.afs.doc('tasks/'+task);
    return this.task.update(task);
  }

  //-------------------End purpose------------------------------

  //-------------------Start Employee-----------------
  private initEmpoyee(){
    this.employeeCollection = this.afs.collection('employees');
    this.employees$ = this.employeeCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data } as IEmployee;
      });
    });
  }

  getEmployees() : Observable<IEmployee[]>{
    return this.employees$;
  }

  addEmployee(employee: IEmployee){
    return this.employeeCollection.add(employee);
  }

  deleteEmployee(employee: IEmployee){
    this.employee = this.afs.doc('employees/'+employee.id);
    return this.employee.delete();
  }

  updateEmployee(employee: IEmployee){
    let employeeId = employee.id;
    delete employee.id;
    this.employee = this.afs.doc('employees/'+employeeId);
    return this.employee.update(employee);
  }
  //-------------------End Employee-----------------
}
