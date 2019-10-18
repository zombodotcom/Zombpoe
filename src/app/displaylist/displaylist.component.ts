import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { PoeninjaapiService, CharacterData } from "../poeninjaapi.service";
import { DataSource } from "@angular/cdk/table";
import { Sort } from "@angular/material/sort";
import { NgForm, FormBuilder } from "@angular/forms";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { setTimeout } from "timers";
import axios from "axios";
const { net } = require("electron");
const { ipcRenderer, remote } = require("electron");
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpClientJsonpModule
} from "@angular/common/http";
import { Observable } from "rxjs";
import { PythonShell } from "python-shell";

import { CookieService } from "ngx-cookie-service";
// import { Cookies } from "electron";
// import { PythonShell } from "python-shell";
import { map } from "rxjs/operators";
import { StringDecoder } from "string_decoder";
import { MatTableDataSource } from "@angular/material";
import { Cookies, dialog } from "electron";
import { JsonPipe } from "@angular/common";
import { async } from "@angular/core/testing";
import { spawn } from "child_process";
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
  public stashdata2;
  // public itemlist:any;
  sortedData: PoeNinjaItemData[];
  dataSource2;
  cookieValue = "UNKNOWN";
  users2: CharacterData[];
  tester3: CharacterData;
  profileForm: FormGroup;
  devstashurl;
  publicstashurl;
  usrNameChanges: string;
  usrNameStatus: string;
  requestOptions;
  headerDict = {
    POESESSID: "null"
  };
  devurl;
  characteritemsurl;
  formattedMessage;
  userForm = new FormGroup({
    POESESSID: new FormControl("***Replace***", Validators.maxLength(20)),
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
  stashurl: string;
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
  isDev = require("electron-is-dev");
  //isDevMode = process.execPath.match(/dist[\\/]electron/i);
  onFormSubmit(): void {
    // fetch.Promise = Bluebird;

    // async () => {
    //   // let generateQueryParams = query =>
    //   //   "?" +
    //   //   Object.keys(query)
    //   //     .map(key => (key = query))
    //   //     .join("&");
    //   let POESESSID = "***Replace***";
    //   // let query = {
    //   //   accountName: "qqzazraelz",
    //   //   realm: "pc",
    //   //   league: "Blight",
    //   //   tab: 0,
    //   //   tabIndex: 0
    //   // };
    //   fetch(
    //     "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=1&tabIndex=1" +
    //       {
    //         headers: { COOKIE: POESESSID = "***Replace***" }
    //       }
    //   )
    //     .then(res => res.json())
    //     .then(res => console.log({ res }));
    // };

    console.log("POESESSID:" + this.userForm.get("POESESSID").value);
    console.log("accountName:" + this.userForm.get("accountName").value);
    console.log("character:" + this.userForm.get("characterName").value);
    this.acountNameForString = this.userForm.get("accountName").value;
    this.characterNameForString = this.userForm.get("characterName").value;
    this.poessForString = this.userForm.get("POESESSID").value;
    // console.log(this.cookieService.getAll());
    this.cookieService.set(
      "POESESSID",
      "123",
      14,
      "/",
      ".pathofexile.com",
      true,
      "Strict"
    );

    this.headerDict = {
      POESESSID: this.poessForString
    };
    this.requestOptions = {
      headers: new Headers(this.headerDict)
    };
    if (this.isDev) {
      console.log("IS IT DEV MODE?");
      this.devurl =
        "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      this.characteritemsurl =
        "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=" +
        encodeURIComponent(this.userForm.get("accountName").value) +
        "&character=" +
        encodeURIComponent(this.userForm.get("characterName").value);
      // let privatetesturl =
      //   "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      this.stashurl =
        "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=1&tabIndex=1";
    } else {
      // this.devurl =
      //   "https://cors-anywhere.herokuapp/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      // this.characteritemsurl =
      this.characteritemsurl =
        "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=1&tabIndex=1";
      "https://www.pathofexile.com/character-window/get-items?accountName=" +
        encodeURIComponent(this.userForm.get("accountName").value) +
        "&character=" +
        encodeURIComponent(this.userForm.get("characterName").value);
      this.stashItems =
        "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=1&tabIndex=1";
    }

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
    //

    // let params = new HttpParams().set(
    //   "accountName",
    //   encodeURIComponent(this.userForm.get("accountName").value)
    // );

    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     COOKIE: "my-auth-token"
    //   })
    // };
    // this.http
    //   .get(this.stashurl, {
    //     withCredentials: true,
    //     headers: new HttpHeaders({
    //       "Content-Type": "application/json",
    //       POESESSID: "***Replace***",
    //       cookie: "Derp=Hi"
    //     })
    //   })
    //   .subscribe(people => {
    //     var cookie1 = "POESESSID=***Replace***";
    //     document.cookie = cookie1; //document.cookie adds cookie1 to document
    //     console.log("why");
    //     people;
    //     this.stashdata2 = people;
    //     console.log(this.stashdata2);
    //   });

    // const axiosConfig = {
    //   headers: {
    //     "content-Type": "application/json",
    //     Accept: "/",
    //     "Cache-Control": "no-cache",
    //     cookie: "POESESSID=***Replace***",
    //     POESESSID: "***Replace***",
    //     Authorization: this.POESESSID = "***Replace***",
    //     crossDomain: true
    //   },
    //   credentials: "same-origin",
    //   xhrFields: {
    //     withCredentials: true
    //   }
    // };
    // axios.defaults.withCredentials = true;
    // // var cookie2 = "POESESSID=***Replace***";
    // // document.cookie = cookie2; //document.cookie adds cookie1 to document
    // axios
    //   .get(this.stashurl, axiosConfig)
    //   .then(res => {
    //     // Some result here

    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(":(");
    //   });

    //   const form = new FormData();
    //   form.append("POESESSID", "***Replace***");
    //   axios(
    //     "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=1&tabIndex=1",
    //     {
    //       method: "get",
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Cookie: "POESESSID=***Replace***"
    //       },
    //       withCredentials: true,
    //       data: form
    //     }
    //   ).then(response => {
    //     console.log(response);
    //   });
  }

  // end of on submit

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
    var x = new XMLHttpRequest();
    x.open(
      "GET",
      "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=1&tabIndex=1",
      true
    );
    x.withCredentials = true;
    // I put "XMLHttpRequest" here, but you can use anything you want.
    x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    x.setRequestHeader("POESESSID", "**REPLACE**");
    x.onload = function() {
      console.log(x.responseText, "hello");
      console.log("hello");
    };
    x.send();

    //   var xhr = new XMLHttpRequest();
    //   xhr.setRequestHeader(
    //     "Cookie",
    //     "POESESSID=***Replace***"
    //   );
    //   xhr.open(
    //     "GET",
    //     "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=1&tabIndex=1",
    //     true
    //   );
    //   xhr.withCredentials = true;
    //   xhr.onreadystatechange = function() {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //       alert(xhr.responseText);
    //       // Get header from php server request if you want for something
    //       // alert("Cookie: " + cookie);
    //     }
    //   };
    //   xhr.send();
    // var session = require("electron").remote.session;
    // var ses = session.fromPartition("persist:name");
    // const cookie = {
    //   url: "http://www.pathofexile.com",
    //   name: "POESESSID",
    //   value: "b82835daa9c1f8d4ed42af934af45d1b"
    // };
    // ses.cookies.set(cookie).then(
    //   () => {
    //     // success
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    // ses.cookies
    //   .get({ url: "http://www.pathofexile.com" })
    //   .then(cookies => {
    //     console.log(cookies, "Hi");
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // ses.cookies
    //   .get({})
    //   .then(cookies => {
    //     console.log(cookies, "all cookies");
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // PythonShell.run("my_script.py", null, function(err) {
    //   if (err) throw err;
    //   console.log("finished");
    // });
    // let priceStash = () => {
    //   let url =
    //     "https://cors-anywhere.herokuapp.com/http://www.pathofexile.com/character-window/get-stash-items";
    //   const options = {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       //withCredentials: true,
    //       Cookie: "POESESSID=***Replace***"
    //     }
    //   };

    //   const props = {
    //     league: "Blight",
    //     tabs: "1",
    //     tabIndex: "1",
    //     accountName: "qqazraelz"
    //   };
    //   const axios = require("axios");
    //   axios
    //     .get(url, props, options)
    //     .then(response => {
    //       console.log(response, "WTF");
    //       this.stashdata2 = response;
    //       console.log(this.stashdata2, "WTF");
    //     })
    //     .catch(error => console.log(error, "HELLO"));
    // };

    // console.log(this.stashdata2);
    // console.log(priceStash);

    // const spawn = require("child_process").spawn;
    // const pythonProcess = spawn("python", ["hello.py"]);
    // pythonProcess.stdout.on("data", data => {
    //   // Do something with the data returned from python script
    // });
    const fetch = require("node-fetch");
    let cookie2 = {
      url: "http://www.pathofexile.com",
      name: "POESESSID",
      value: "***Replace***",
      httpOnly: true,
      secure: true
    };
    // const app = require("electron").remote.app;
    // const remote = require("electron").remote;
    // // const dialog = remote.require("dialog");

    // // // dialog.showErrorBox("My message", "hi.");
    // console.log(app, "ElectronApp");
    // let currentwindow = remote.getCurrentWindow();
    // console.log(currentwindow, "ElectronApp");
    // let netrequest = net.request("https://github.com");
    // netrequest.on("response", response => {
    //   // console.log(`STATUS: ${response.statusCode}`);
    //   // console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    //   // response.on("data", chunk => {
    //   //   console.log(`BODY: ${chunk}`);
    //   // });
    //   response.on("end", () => {
    //     console.log("No more data in response.");
    //   });
    // });
    // netrequest.end();

    // Set MyGlobalVariable.
    // ipcRenderer.send("setMyGlobalVariable", "Hi There!");

    // // Read MyGlobalVariable.
    // let derp = remote.getGlobal("MyGlobalVariable"); // => "Hi There!"
    // console.log(derp,"hello");
    // remote.getGlobal("sharedObj");
    // console.log(remote.getGlobal("sharedObj"), "hello");
    // var remote = require("electron").remote;

    // // show initial value from main process (in dev console)
    // console.log(remote.getGlobal("sharedObj").prop1, "prop1");

    // // change value of global prop1
    // remote.getGlobal("sharedObj").prop1 = 125;

    // // show changed value in main process (in stdout, as a proof it was changed)
    // var ipcRenderer = require("electron").ipcRenderer;
    // ipcRenderer.send("show-prop1");

    // // show changed value in renderer process (in dev console)
    // console.log(remote.getGlobal("sharedObj").prop1, "prop1");
    // const { net } = require("electron");
    // const request2 = net.request("https://github.com");
    // console.log(request2);
    // request2.on("response", response => {
    //   console.log(response.statusCode);
    //   console.log("HEADERS: ${JSON.stringify(response.headers)}");
    //   response.on("data", chunk => {
    //     console.log("BODY: ${chunk}");
    //     console.log("hi");
    //   });
    //   response.on("end", () => {
    //     console.log("No more data in response.");
    //   });
    // });
    // request2.end();
    // const { session } = require("electron");
    // session.defaultSession.cookies
    //   .get({})
    //   .then(cookies => {
    //     console.log(cookies);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // const { remote } = require('electron'),

    // const { remote } = require("electron");
    // const { BrowserWindow } = remote;

    // dialog.showMessageBox(remote.getCurrentWindow(), {
    //   type: "warning",
    //   message: "You have been warned.",
    //   buttons: ["OK"]
    // });
    // const express = require("express");
    // const app = express();

    // let runPy = new Promise(function(success, nosuccess) {
    //   const { spawn } = require("child_process");
    //   const pyprog = spawn("python", ["./hello.py"]);

    //   pyprog.stdout.on("data", function(data) {
    //     success(data);
    //   });

    //   pyprog.stderr.on("data", data => {
    //     nosuccess(data);
    //   });
    // });

    // app.get("/", (req, res) => {
    //   res.write("welcome\n");

    //   runPy.then(function(fromRunpy) {
    //     console.log(fromRunpy.toString());
    //     res.end(fromRunpy);
    //   });
    // });

    // app.listen(4000, () => console.log("Application listening on port 4000!"));

    let testurl =
      "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=1&tabIndex=1";
    let testurl2 = "https://cors-anywhere.herokuapp.com/" + testurl;
    let headers = new HttpHeaders();
    headers = headers.append("COOKIE", "POE=DERP");

    // this.onChanges();

    // let isDevMode = process.execPath.match(/dist[\\/]electron/i);
    if (this.isDev) {
      console.log("IS IT DEV MODE?");
      this.devurl =
        "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      this.characteritemsurl =
        "https://cors-anywhere.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=" +
        encodeURIComponent(this.userForm.get("accountName").value) +
        "&character=" +
        encodeURIComponent(this.userForm.get("characterName").value);
      // let privatetesturl =
      //   "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
    } else {
      this.devurl =
        "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
      this.characteritemsurl =
        "https://www.pathofexile.com/character-window/get-items?accountName=" +
        encodeURIComponent(this.userForm.get("accountName").value) +
        "&character=" +
        encodeURIComponent(this.userForm.get("characterName").value);
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

    // get initial fossil data
    this.svc.getPoeNinjaData(this.devurl).subscribe(data => {
      this.poeninjaData = data;
      this.sortedData = this.poeninjaData;
      // add console output here and add to main data
      console.log(this.poeninjaData);
    });

    console.log("Before");

    let derplist;

    // get initial character data
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

  setCookie(data, name, ses, BaseURL) {
    var expiration = new Date();
    var hour = expiration.getHours();
    hour = hour + 6;
    expiration.setHours(hour);
    ses.cookies.set(
      {
        url: BaseURL, //the url of the cookie.
        name: name, // a name to identify it.
        value: data, // the value that you want to save
        expirationDate: expiration.getTime()
      },
      function(error) {
        console.log(error);
      }
    );
  }

  getCookie(name, ses) {
    var value = {
      name: name // the request must have this format to search the cookie.
    };
    ses.cookies.get(value, function(error, cookies) {
      console.log(cookies[0].value); // the value saved on the cookie
    });
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
