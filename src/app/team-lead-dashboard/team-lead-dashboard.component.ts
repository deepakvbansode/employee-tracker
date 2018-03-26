import { Subject } from 'rxjs/Subject';
import { ITask, Priority, TaskStatus, TaskPhases, IHistory, IActivity, IAddHistoryRequest } from './../models/app.models';
import { AppService } from './../services/app.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'team-lead-dashboard',
  templateUrl: './team-lead-dashboard.component.html',
  styleUrls: ['./team-lead-dashboard.component.css']
})
export class TeamLeadDashboardComponent implements OnInit {
  tasks: Array<ITask>;
  private _onDestroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._appService.getTasks()
      .takeUntil(this._onDestroy$)
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask(){
    let activity : IActivity = {
         employee_id : 'FDHNj8OZeH17zb8hN3Fr',
        date : '25-03-2017',
        start_time : '0000122',
        end_time : '0000054',
        percentage_completed : '10',
        comment : 'first comment',
    };
    let task:ITask = {
      name : 'third Task',
      description : 'test',
      client : 'prisms',
      priority : Priority.low,
      module_name : 'sdms',
      points : 10,
      currentTaskStatus : TaskStatus.unAssigned,
      currentTaskPhase : TaskPhases.development,

    };
    this._appService.addTask(task)
      .then((result)=>{
        console.log('add Task',result);
        let request : IAddHistoryRequest = {
          taskId : '064lHQGDq0hzu4OBU0NY',
          activity : activity
        };
        this._appService.addTaskHistory(request);
      })
      .catch((e)=> console.log("error in add task:",e));
  }
  ngOnDestroy() {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

}
