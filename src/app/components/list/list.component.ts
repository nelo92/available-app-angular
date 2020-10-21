import { environment } from './../../../environments/environment';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AvailableappService, DataId } from './../../services/availableapp.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from 'node-schedule';
import { callbackify, isObject } from 'util';

const schedule_every_second = "* * * ? * *";
const schedule_every_five_second = "*/5 * * * * *";
const schedule_every_ten_second = "*/10 * * * * *";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  settingForm = this.fb.group({
    mode: "local",
    schedule: false
  });

  inputForm = this.fb.group({
    name: ["", Validators.required],
    uri: ["", Validators.required]
  });

  job: Job;

  datas$: Observable<DataId[]>;
  datas: DataId[];

  isAdd: boolean = false;
  isSchedule: boolean = false;
  isScheduleStart: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private as: AvailableappService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.datas$ = this.as.getAll();
    this.datas$.subscribe(dataIds => this.datas = dataIds);
  }

  onReset() {
    this.isAdd = false;
    this.inputForm.reset();
  }

  onAdd() {
    this.isAdd = true;
    this.inputForm.get("uri").setValue("http://");
  }

  onSubmit() {
    console.log("onSubmit");
    if (this.inputForm.invalid) {
      return;
    }
    console.log("form valid");
    this.as.create({
      name: this.inputForm.get("name").value,
      uri: this.inputForm.get("uri").value
    });
    this.onReset();
  }

  onDelete(data) {
    this.as.delete(data);
  }

  onDeleteAll() {
    this.datas.forEach((data) => {
      this.as.delete(data);
    });
  }

  onCheckStatus() {
    var mode = this.settingForm.get("mode").value;
    var isLocal = (mode === "local") ? true : false;
    console.log("checkStatus...");
    this.datas.forEach((data) => {
      console.log("Call service checkStatus() : " + JSON.stringify(data));
      this.as.checkStatus(data, isLocal);
    });
    console.log("checkStatus.");
  }

  onStartSchedule() {
    this.isScheduleStart = true;
    this.job = new Job(function () {
      console.log("Job callback...")
    });
    this.job.schedule(schedule_every_five_second);
  }

  onStopSchedule() {
    this.isScheduleStart = false;
    this.job.cancel();
  }

  onChangeSchedule(event) {
    this.isSchedule = event.target.checked;
    if (!this.isSchedule && this.isScheduleStart) {
      this.onStopSchedule();
    }
  }

}
