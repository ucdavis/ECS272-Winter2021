import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { LineplotComponent } from './components/lineplot/lineplot.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    VisualizationComponent,
    LineplotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
