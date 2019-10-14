import { Component, OnInit } from "@angular/core";
import { PoeninjaapiService, CharacterData } from "../poeninjaapi.service";
import { DataSource } from "@angular/cdk/table";
import { Sort } from "@angular/material/sort";

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
@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.scss"]
})
export class DisplaylistComponent implements OnInit {
  public restcolumns: string[];
  cookieValue = "UNKNOWN";
  public poeninjaData: any;
  public stashItems: any;
  public characterItems: any;
  public charactersRequest: any;
  // public itemlist:any;
  sortedData: PoeNinjaItemData[];
  dataSource2;
  public images;
  users2: CharacterData[];
  tester3: CharacterData;

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
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.cookieService.set("POESESSID", "insert here");
    this.cookieValue = this.cookieService.get("POESESSID");
    console.log(this.cookieValue);
    let isDevMode = process.execPath.match(/dist[\\/]electron/i);
    let devurl;
    let characteritemsurl;
    if (isDevMode) {
      console.log("IS IT DEV MODE?");
      devurl =
        "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      characteritemsurl =
        "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=qqazraelz&character=ZomboTD";
      // let privatetesturl =
      //   "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
    } else {
      devurl =
        "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      characteritemsurl =
        "https://www.pathofexile.com/character-window/get-items?accountName=qqazraelz&character=ZomboTD";
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

    this.svc.getStashData(characteritemsurl).subscribe(result => {
      console.log(result);
    });

    // new edit area
    this.svc
      .getUsers(characteritemsurl)
      .subscribe((users2: CharacterData[]) => {
        this.users2 = users2;
        console.log(users2, "users2");
        this.dataSource2 = new MatTableDataSource(users2);

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

        // this.generateTableHead("table2", data3);
        // this.generateTable("table2", this.users2);
      });

    // this.svc
    //   .getImages(characteritemsurl)
    //   .subscribe(images => (this.images = images));

    this.svc.getPoeNinjaData(devurl).subscribe(data => {
      this.poeninjaData = data;
      this.sortedData = this.poeninjaData;
      // add console output here and add to main data
      console.log(this.poeninjaData);
    });

    console.log("Before");

    let derplist;
    // derplist = this.svc.findAllShows(characteritemsurl).subscribe(data => data);
    // // console.log(derpite, "derpite");

    // this.svc.sendGetRequest(characteritemsurl).subscribe(data => {
    //   console.log(data, "sendget");
    //   this.characterItems = data;
    // });
    // this.http
    //   .get(characteritemsurl)
    //   .pipe(map(res => (this.charactersRequest = res)));

    this.http.get<CharacterData>(characteritemsurl).subscribe(
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
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        // for (var i = 0; i < col.length; i++) {
        //   console.log(col, col[i]);
        // }

        // // ADD JSON DATA TO THE TABLE AS ROWS.
        // for (var i = 0; i < temptable.length; i++) {
        //   for (var j = 0; j < col.length; j++) {
        //     console.log(temptable[i][col[j]], "hi23434");
        //   }
        // }

        // this.dataSource2=
        // console.log('Items: ' + data.userId);
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

  // start of functions after init
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
  // generateTableHead(table, data) {
  //   let thead = table.createTHead();
  //   let row = thead.insertRow();
  //   for (let key of data) {
  //     let th = document.createElement("th");
  //     let text = document.createTextNode(key);
  //     th.appendChild(text);
  //     row.appendChild(th);
  //   }
  // }
  // generateTable(table, data) {
  //   for (let element of data) {
  //     let row = table.insertRow();
  //     for (let key in element) {
  //       let cell = row.insertCell();
  //       let text = document.createTextNode(element[key]);
  //       cell.appendChild(text);
  //     }
  //   }
  // }
}
