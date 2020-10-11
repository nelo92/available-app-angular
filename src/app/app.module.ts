import { environment } from './../environments/environment';
import { AvailableappService } from './services/availableapp.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListComponent } from './components/list/list.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [
    AppComponent, 
    HeaderComponent, 
    FooterComponent, 
    ListComponent
  ],
  bootstrap: [AppComponent],
  providers: [AvailableappService]
})
export class AppModule { }
