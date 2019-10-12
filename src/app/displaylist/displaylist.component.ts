import { Component, OnInit } from "@angular/core";
import { PoeninjaapiService } from "../poeninjaapi.service";
import { DataSource } from "@angular/cdk/table";
import { Sort } from "@angular/material/sort";
import { HttpClient } from "@angular/common/http";
import { Cookies } from "electron";

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
  public poeninjaData: any;
  sortedData: PoeNinjaItemData[];
  // fetch = require("node-fetch");

  displayedColumns: string[] = [
    "name",
    "chaosValue",
    "exaltedValue",
    "icon",
    "explicitModifiers"
  ];

  constructor(private svc: PoeninjaapiService, private http: HttpClient) {}
  ngOnInit() {
    // var rp = require("request-promise");
    // this.http.get('/api/people/1').subscribe(character => {
    //   this.http.get(character.homeworld).subscribe(homeworld => {
    //     character.homeworld = homeworld;
    //     this.loadedCharacter = character;
    //   });
    // });
    // const priceStash = () => {
    //   let url = "http://www.pathofexile.com/character-window/get-stash-items";
    //   const options = {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       //withCredentials: true,
    //       Cookie: "POESESSID=<poesessid_here>"
    //     }
    //   };

    //   const props = {
    //     league: "Softcore Betrayal",
    //     tabs: "1",
    //     tabIndex: "1,3",
    //     accountName: "<accountname_here>"
    //   };

    //   this.http
    //     .get(url, props, options)
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => console.log(error));
    // };
    // var options = {
    //   uri: "https://api.github.com/user/repos",
    //   json: true // Automatically parses the JSON string in the response
    // };

    // rp(options)
    //   .then(function(repos) {
    //     console.log("User has %d repos", repos.length);
    //   })
    //   .catch(function(err) {
    //     // API call failed...
    //   });

    this.http
      .get("https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil")
      .subscribe(json => console.log(json));
    this.svc.getPoeNinjaData().subscribe(data => {
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
