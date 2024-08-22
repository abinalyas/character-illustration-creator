import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContextSelectorComponent } from './context-selector/context-selector.component';
import { FormsModule } from '@angular/forms';
import { CanvasComponent } from './canvas/canvas.component';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ContextSelectorComponent,
    CanvasComponent,
    CreateCharacterComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
