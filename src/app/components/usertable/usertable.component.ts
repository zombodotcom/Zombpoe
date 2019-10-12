import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Observable } from "rxjs";
import { DataSource } from "@angular/cdk/collections";
import { User } from "../../models/user.model";
import { DisplaylistComponent } from "../../displaylist/displaylist.component";
@Component({
  selector: "usertable",
  templateUrl: "./usertable.component.html",
  styleUrls: ["./usertable.component.scss"]
})
export class UsertableComponent implements OnInit {
  poeninjaData = [];
  dataSource = new UserDataSource(this.userService);
  derpList: any;

  displayedColumns = [
    "name",
    "chaosValue",
    "exaltedValue"
    // "explicitModifiers"
  ];
  constructor(private userService: UserService) {}

  ngOnInit() {}
}
export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    const derp = this.userService.getUser();
    // console.log(this.userService.getUser())
    return derp;
  }
  disconnect() {}
}
