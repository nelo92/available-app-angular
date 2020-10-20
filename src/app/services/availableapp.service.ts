import { environment } from './../../environments/environment.prod';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum Status { EMPTY, PROGRRESS, READY, ERROR }
export interface Data { name: string; uri: string; status: Status }
export interface DataId extends Data { id: string; }
export interface DataStatus { status: number; }

@Injectable({
  providedIn: 'root'
})
export class AvailableappService {

  private dataCollection: AngularFirestoreCollection<Data>;
  private datas$: Observable<DataId[]>;

  constructor(private http: HttpClient, private fs: AngularFirestore) { }

  getAll() {
    console.log("service getAll()");
    this.dataCollection = this.fs.collection<Data>("datas");
    this.datas$ = this.dataCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Data;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.datas$;
  }

  create(data) {
    console.log("service create()");
    this.dataCollection = this.fs.collection<Data>('datas');
    this.dataCollection.add(data)
      .then(function (doc) {
        console.log("Document written with ID: ", doc.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  delete(data: DataId) {
    console.log("service delete()");
    this.dataCollection.doc(data.id).delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  private setDataStatus(data: DataId, status: Status) {
    this.dataCollection.doc(data.id).set({
      name: data.name,
      uri: data.uri,
      status: status,
    });
  }

  checkStatus(data: DataId, isLocal: boolean) {
    const options = { params: new HttpParams().set("pu", data.uri) };
    let url = (isLocal) ? environment.urlCheckStatusLocal : environment.urlCheckStatusFirebaseFunction;
    console.log("Call url for checkstatus: " + url);
    this.http.get(url, options)
      .subscribe(
        (res: DataStatus) => {
          console.log("response: " + JSON.stringify(res));
          let s = (res.status == 200) ? Status.READY : Status.ERROR;
          this.setDataStatus(data, s);
        },
        err => {
          console.log("error!");
          this.setDataStatus(data, Status.ERROR);
        }
      );
  }

}