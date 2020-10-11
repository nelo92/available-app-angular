import { AvailableappService } from './../../services/availableapp.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

// TODO MAU - see this
// import { Job } from 'node-schedule';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  datas: Observable<any[]>;

  isAdd : boolean = false;

  inputForm = this.fb.group({
    name: ["",Validators.required ],
    url: ["", Validators.required]
  });

  schedule = require('node-schedule');

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private availableAppServivce: AvailableappService) { }

  ngOnInit(): void {
    this.load();    
   }

  load(){
    this.datas = this.availableAppServivce.getAll();

    console.log("Create Scheduler Job");
    // Every second
    let exp_every_second = "* * * ? * *";
    // Every five second
    let exp_every_five_second = "*/5 * * * * *";
    this.schedule.scheduleJob(exp_every_five_second, function(){
      console.log("Job work!");
      // Dont work - why !!!
      // this.checkStatus();
    });
    console.log("Create Scheduler Job.");
    
  }

  onReset(){
    this.isAdd = false;
    this.inputForm.reset();  
  }

  onAdd(){
    this.isAdd = true;
  }

  onSubmit(){
    console.log("onSubmit");
    if (this.inputForm.invalid) {
      return;
    }
    console.log("form valid");
    this.availableAppServivce.create({
     name: this.inputForm.get("name").value,
     url: this.inputForm.get("url").value
   });
   this.onReset();
  }

  onDelete(data){     
    this.availableAppServivce.delete(data);
  }

  // TODO MAU - Implement when add modal confirmation
  onDeleteAll(){       
    // this.datas.forEach((datas) => datas.map(data =>{       
    //   this.availableappServivce.delete(data);      
    // }));
  }

  checkStatus(){
    console.log("checkStatus");
  }

  callDataUrl(){
    console.log("callDataUrl");
    this.http.get('http://www.google.fr')
      .subscribe(response => { 
        // TODO MAU - get status of response
        console.log("get status :" +response);
      });
    console.log("callDataUrl.");
  }

}
