import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO MAU - Move to folder models
export interface Data { name: string; url: string; status: string }
export interface DataId extends Data { id: string; }

@Injectable({
  providedIn: 'root'
})
export class AvailableappService {

  private dataCollection: AngularFirestoreCollection<Data>;  
  datas: Observable<DataId[]>;
  
  constructor(private afs: AngularFirestore) { }

  getAll(){
    console.log("service getAll()");
    this.dataCollection = this.afs.collection<Data>("datas");
    this.datas = this.dataCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Data;
        const id = a.payload.doc.id;        
        return {id, ...data};
      }))
    ); 
    return this.datas; 
  }

  create(data){
    console.log("service create()");
    this.dataCollection = this.afs.collection<Data>('datas');       
    this.dataCollection.add(data)
    .then(function(doc) {
        console.log("Document written with ID: ", doc.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });; 
  }

  delete(data){
    console.log("service delete()");
    this.dataCollection.doc(data.id).delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    }); 
  }

}
