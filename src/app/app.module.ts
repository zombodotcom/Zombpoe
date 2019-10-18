import "reflect-metadata";
import "../polyfills";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HttpXhrBackend
  // HttpClientXsrfModule,
  // HTTP_INTERCEPTORS
} from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { map } from "rxjs/operators";
import { AppRoutingModule } from "./app-routing.module";
import { MatPaginatorModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";

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
// import { HttpRequestInterceptor } from "./HttpRequestInterceptor";
import { NgxElectronModule } from "ngx-electron";
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
    ReactiveFormsModule,
    SharedModule,
    HomeModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    NgxElectronModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    // HttpXhrBackend,
    // HttpClientXsrfModule.withOptions({
    //   cookieName: "POESESSID"
    // }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    // HttpClient,
    // HttpXhrBackend,
    // [
    //   {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: HttpRequestInterceptor,
    //     multi: true
    //   }
    // ],
    UserService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
