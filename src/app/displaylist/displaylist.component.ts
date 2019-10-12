import { Component, OnInit } from "@angular/core";
import { PoeninjaapiService } from "../poeninjaapi.service";
import { DataSource } from "@angular/cdk/table";
import { Sort } from "@angular/material/sort";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
// import { Cookies } from "electron";
// import { PythonShell } from "python-shell";

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
  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      POESESID: "INSERT HERE"
    })
  };
  constructor(private svc: PoeninjaapiService, private http: HttpClient) {}
  ngOnInit() {
    // PythonShell.run("../services/pythonservice/getstash.py", null, function(
    //   err
    // ) {
    //   if (err) throw err;
    //   console.log("finished");
    // });
    // let path = require("path");
    // var rq = require("request-promise");

    // var subpy = require("child_process").spawn("python", ["getstash.py"]);

    // PythonShell.run("getstash.py", null, function(err, result) {
    //   if (err) throw err;
    //   console.log("finished");
    //   console.log(result);
    // });
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
    let devurl =
      "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
    this.http.get(devurl).subscribe(json => console.log(json));

    let stashurl =
      "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=qqazraelz&character=ZomboTD";
    this.http.get(stashurl).subscribe(json => console.log(json));
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

    console.log("Before");
    let posturl =
      "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&tabs=0&tabIndex=1&accountName=qqazraelz";
    this.http
      .get(posturl, this.httpOptions)
      .subscribe(json => console.log(json));
    console.log("After");
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
