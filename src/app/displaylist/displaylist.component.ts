import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { PoeninjaapiService, CharacterData } from "../poeninjaapi.service";
import { DataSource } from "@angular/cdk/table";
import { Sort } from "@angular/material/sort";
import { NgForm, FormBuilder } from "@angular/forms";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
// import { Cookies } from "electron";
// import { PythonShell } from "python-shell";
import { map } from "rxjs/operators";
import { StringDecoder } from "string_decoder";
import { MatTableDataSource } from "@angular/material";
export interface PoeNinjaItemData {
  name: string;
  chaosValue: number;
  icon: string;
  exaltedValue: number;
  explicitModifiers: any;
}

// if (isDev) {
//   console.log("Running in development");
// } else {
//   console.log("Running in production");
// }

export interface ZombpoeData {
  character: {};
  items: {};
}
// export class ProfileEditorComponent {
//   profileForm = new FormGroup({
//     firstName: new FormControl(""),
//     lastName: new FormControl("")
//   });
// }
@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.scss"]
})
export class DisplaylistComponent implements OnInit {
  public POESESSID;
  public accountName;
  public characterName;
  public acountNameForString = "qqazraelz";
  public poessForString = "Null";
  public characterNameForString = "ZomboTD";
  public restcolumns: string[];
  public poeninjaData: any;
  public stashItems: any;
  public characterItems: any;
  public charactersRequest: any;
  public images;
  // public itemlist:any;
  sortedData: PoeNinjaItemData[];
  dataSource2;
  cookieValue = "UNKNOWN";
  users2: CharacterData[];
  tester3: CharacterData;
  profileForm: FormGroup;
  usrNameChanges: string;
  usrNameStatus: string;
  devurl;
  characteritemsurl;
  formattedMessage;
  userForm = new FormGroup({
    POESESSID: new FormControl("123123", Validators.maxLength(20)),
    accountName: new FormControl("qqazraelz", Validators.required),
    characterName: new FormControl("ZomboTD", Validators.maxLength(20))
  });
  accform = new FormControl(20, Validators.required);
  characterform = new FormControl();

  // fetch = require("node-fetch");

  displayedColumns: string[] = [
    "name",
    "chaosValue",
    "exaltedValue",
    "icon",
    "explicitModifiers"
  ];
  displayedColumnsUser: string[] = [
    "name",
    "icon",
    "socketedItems"
    // "chaosValue",
    // "exaltedValue",
    // "icon",
    // "explicitModifiers"
  ];
  displayedColumnsUser2: string[] = [
    "items",
    "icon",
    "socketedItems"
    // "icon"
    // "socketedItems"
    // "chaosValue",
    // "exaltedValue",
    // "icon",
    // "explicitModifiers"
  ];

  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      POESESSID: "insert here"
    })
  };
  itemsdata3: any;
  constructor(
    private svc: PoeninjaapiService,
    private http: HttpClient,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {}

  // formattedMessage: string;
  // onChanges(): void {
  //   this.profileForm.valueChanges.subscribe(val => {
  //     console.log(val.POESESSID, val.accountName, val.characterName);
  //   });
  // }

  onFormSubmit(): void {
    console.log("POESESSID:" + this.userForm.get("POESESSID").value);
    console.log("accountName:" + this.userForm.get("accountName").value);
    console.log("character:" + this.userForm.get("characterName").value);
    this.acountNameForString = this.userForm.get("accountName").value;
    this.characterNameForString = this.userForm.get("characterName").value;
    this.poessForString = this.userForm.get("POESESSID").value;

    this.characteritemsurl =
      "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=" +
      this.userForm.get("accountName").value +
      "&character=" +
      this.userForm.get("characterName").value;

    this.http.get<CharacterData>(this.characteritemsurl).subscribe(
      data => {
        this.tester3 = data;
        this.itemsdata3 = data.items;
        // console.log("Items: " + data.items, "derp", typeof data.items);
        this.dataSource2 = new MatTableDataSource(data.items);
        console.log("Items: " + data.items);
        for (let entry of data.items) {
          console.log(entry);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );
  }

  getuserName(): any {
    return this.userForm.get("name");
  }
  setResetName() {
    this.POESESSID.reset();
    this.accountName.reset();
    this.characterform.reset();
  }
  changeValue() {
    console.log(this.POESESSID.value);
    console.log(this.accountName.value);
    console.log(this.characterform.value);

    this.POESESSID = new FormControl(!this.POESESSID.value);
    this.accountName = new FormControl(!this.accountName.value);
    this.characterform = new FormControl(!this.characterform.value);
  }

  updateName() {
    console.log(this.POESESSID.value);
    console.log(this.accountName.value);
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      accountName: "qqazraelz",
      POESESSID: "123123",
      characterName: "ZomboTD"
    });

    // this.onChanges();

    this.cookieService.set("POESESSID", "insert here");
    this.cookieValue = this.cookieService.get("POESESSID");
    console.log(this.cookieValue);
    let isDevMode = process.execPath.match(/dist[\\/]electron/i);

    if (isDevMode) {
      console.log("IS IT DEV MODE?");
      this.devurl =
        "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      this.characteritemsurl =
        "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=" +
        this.userForm.get("accountName").value +
        "&character=" +
        this.userForm.get("characterName").value;
      // let privatetesturl =
      //   "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
    } else {
      this.devurl =
        "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      this.characteritemsurl =
        "https://www.pathofexile.com/character-window/get-items?accountName=" +
        this.userForm.get("accountName").value +
        "&character=" +
        this.userForm.get("characterName").value;
    }

    let options = {
      headers: {
        //withCredentials: true,
        Cookie: "POESESSID=insert here"
      }
    };

    let urlConfig = {
      league: "Blight",
      tabs: "1",
      tabIndex: "1,3",
      accountName: "qqazraelz"
    };
    interface ICustomer {
      name: string;
    }

    let customer: ICustomer[];

    this.svc.getPoeNinjaData(this.devurl).subscribe(data => {
      this.poeninjaData = data;
      this.sortedData = this.poeninjaData;
      // add console output here and add to main data
      console.log(this.poeninjaData);
    });

    console.log("Before");

    let derplist;

    this.http.get<CharacterData>(this.characteritemsurl).subscribe(
      data => {
        this.tester3 = data;
        this.itemsdata3 = data.items;
        // console.log("Items: " + data.items, "derp", typeof data.items);
        this.dataSource2 = new MatTableDataSource(data.items);
        console.log("Items: " + data.items);
        for (let entry of data.items) {
          console.log(entry);
        }

        // EXTRACT VALUE FOR HTML HEADER.
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        let temptable = data.items;
        for (var i = 0; i < temptable.length; i++) {
          // console.log(temptable);
          for (var key in temptable[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
              // console.log(col, key, "hi");
            }
          }
        }
        // CREATE DYNAMIC TABLE.
        this.restcolumns = col;
        console.log(this.restcolumns, "rest Columns");
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );

    ///end of on init
  }

  // start of functions after initasd
  sortData(sort: Sort) {
    const data = this.poeninjaData.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "name":
          return compare(a.name, b.name, isAsc);
        case "chaosValue":
          return compare(a.chaosValue, b.chaosValue, isAsc);
        case "exaltedValue":
          return compare(a.exaltedValue, b.exaltedValue, isAsc);
        default:
          return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
