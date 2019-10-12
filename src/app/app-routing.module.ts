import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";
import { AboutComponent } from "./about/about.component";
import { DisplaylistComponent } from "./displaylist/displaylist.component";
import { UsertableComponent } from "./components/usertable/usertable.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "display",
    component: DisplaylistComponent
  },
  {
    path: "userlist",
    component: UsertableComponent
  },
  { path: "about", component: AboutComponent },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
