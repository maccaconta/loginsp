import { Injector, NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";
import { OAuthModule } from 'angular-oauth2-oidc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';


import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { EnvVariables } from './dialog.model';
import { ConfigurationServiceService } from './configuration-service.service';

export function ConfigLoader(injector: Injector): () => Promise<EnvVariables> {
    return () => injector.get(ConfigurationServiceService).loadConfiguration();
  }


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    OAuthModule.forRoot(),
    MatButtonToggleModule,
    MatIconModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: ConfigLoader,
    deps: [Injector],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
