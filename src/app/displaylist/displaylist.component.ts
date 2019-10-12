import { Component, OnInit } from "@angular/core";
import { PoeninjaapiService } from "../poeninjaapi.service";
import { DataSource } from "@angular/cdk/table";
import { Sort } from "@angular/material/sort";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
// import { Cookies } from "electron";
// import { PythonShell } from "python-shell";
import { map } from "rxjs/operators";
import { StringDecoder } from "string_decoder";
export interface PoeNinjaItemData {
  name: string;
  chaosValue: number;
  icon: string;
  exaltedValue: number;
  explicitModifiers: any;
}

@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.scss"]
})
export class DisplaylistComponent implements OnInit {
  cookieValue = "UNKNOWN";
  public poeninjaData: any;
  public stashItems: any;
  sortedData: PoeNinjaItemData[];
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
    "chaosValue",
    "exaltedValue",
    "icon",
    "explicitModifiers"
  ];
  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      POESESSID: "56c1c517bfada4457566d52ea4fd0cd0"
    })
  };
  constructor(
    private svc: PoeninjaapiService,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.cookieService.set("POESESSID", "56c1c517bfada4457566d52ea4fd0cd0");
    this.cookieValue = this.cookieService.get("POESESSID");
    console.log(this.cookieValue);

    let devurl =
      "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
    let privatetesturl =
      "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
    // this.http.get(devurl).subscribe(json => console.log(json)); // working get
    // this.http.get(privatetesturl).subscribe(json => console.log(json));
    let options = {
      headers: {
        //withCredentials: true,
        Cookie: "POESESSID=56c1c517bfada4457566d52ea4fd0cd0"
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
    // function createUserItems(
    //   name: string,

    // ) {
    //   this.stashItems.push({ name });
    // }
    // let derp = this.http.get(
    //   "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=qqazraelz&character=ZomboTD",
    //   options
    // );
    // let derp = this.http.get(
    //   "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=qqazraelz&character=ZomboTD"
    // );
    let characteritemsurl =
      "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=qqazraelz&character=ZomboTD";

    let customer: ICustomer[];

    function createCustomer(name: Array<String>) {
      for (let x in name[0]) console.log(JSON.stringify(x));
      // console.log(name[0], "hi");
    }
    this.svc.getStashData(characteritemsurl).subscribe(result => {
      this.stashItems = result;
      console.log(result, typeof result);
      let jsonresults = JSON.stringify(result);
      console.log(JSON.parse(jsonresults));
      createCustomer(result.items);
      for (let i in result) {
        console.log(i, "Category");
        for (let key in result[i]) {
          console.log(key + ": " + result[i][key], " object");
          for (let tester in result[i][key][0]) {
            console.log(tester);
          }
        }
      }
      // for (let x in jsonresults) {
      //   console.log(x);
      // }
    });
    this.svc.getStashData(characteritemsurl).subscribe(result => {
      console.log(result);
    });

    // console.log("hello");
    // console.log(this.stashItems, "Hello");

    // new edit area

    this.svc.getPoeNinjaData(devurl).subscribe(data => {
      this.poeninjaData = data;
      this.sortedData = this.poeninjaData;
      // add console output here and add to main data

      // time to add python shellk
      // (async () => {
      //   const generateQueryParams = query =>
      //     "?" +
      //     Object.keys(query)
      //       .map(key => `${key}=${query[key]}`)
      //       .join("&");
      //   const POESESSID = "---------------------";
      //   const query = {
      //     accountName: "--------------",
      //     realm: "pc",
      //     league: "Blight",
      //     tab: 1,
      //     tabIndex: 0
      //   };
      //   fetch(
      //     "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-stash-items" +
      //       generateQueryParams(query),
      //     {
      //       headers: {
      //         COOKIE: `POESESSID=${POESESSID}`
      //       }
      //     }
      //   )
      //     .then(res => res.json())
      //     .then(res => console.log({ res }));
      // })();
      // add console output here
    });

    console.log("Before");

    //sendind cookies currently but sending POESIS
    // let posturl =
    //   "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-stash-items?league=Blight&tabs=0&tabIndex=1&accountName=qqazraelz";
    // this.http
    //   .get(posturl, this.httpOptions)
    //   .subscribe(json => console.log(json));
    // console.log("After");
  }

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
