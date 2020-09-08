import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WriterComponent } from './writer/writer.component';
import { LoadelemComponent } from './loadelem/loadelem.component';

@NgModule({
  declarations: [
    AppComponent,
    WriterComponent,
    LoadelemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
