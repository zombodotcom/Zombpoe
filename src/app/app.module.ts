import "reflect-metadata";
import "../polyfills";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { map } from "rxjs/operators";
import { AppRoutingModule } from "./app-routing.module";
import { MatPaginatorModule } from "@angular/material";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { HomeModule } from "./home/home.module";
import { AboutComponent } from "./about/about.component";
import { DisplaylistComponent } from "./displaylist/displaylist.component";

// poestashservice
import { UserService } from "./services/user.service";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTableModule
} from "@angular/material";
import { UsertableComponent } from "./components/usertable/usertable.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AboutComponent,
    DisplaylistComponent,
    UsertableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
