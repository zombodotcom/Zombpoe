import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { PoeninjaapiService, CharacterData } from "../poeninjaapi.service";
import { DataSource } from "@angular/cdk/table";
import { Sort } from "@angular/material/sort";
import { NgForm, FormBuilder } from "@angular/forms";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { setTimeout } from "timers";
import axios from "axios";
// const { net } = require("electron");
import { ElectronService } from "ngx-electron";

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
import { MatPaginator, MatTableDataSource } from "@angular/material";
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

interface RootObject {
  numTabs: number;
  tabs: Tab[];
  quadLayout: boolean;
  items: Item[];
}

interface Item {
  verified: boolean;
  w: number;
  h: number;
  ilvl: number;
  icon: string;
  league: string;
  id: string;
  name: string;
  typeLine: string;
  identified: boolean;
  note?: string;
  requirements?: Requirement[];
  implicitMods?: string[];
  explicitMods?: string[];
  frameType: number;
  x: number;
  y: number;
  inventoryId: string;
  elder?: boolean;
  flavourText?: string[];
  sockets?: Socket[];
  socketedItems?: any[];
  properties?: Property[];
  descrText?: string;
  support?: boolean;
  additionalProperties?: AdditionalProperty[];
  secDescrText?: string;
  veiledMods?: string[];
  veiled?: boolean;
  abyssJewel?: boolean;
  corrupted?: boolean;
  talismanTier?: number;
  utilityMods?: string[];
  craftedMods?: string[];
  shaper?: boolean;
  hybrid?: Hybrid;
}

interface Hybrid {
  isVaalGem: boolean;
  baseTypeName: string;
  properties: Requirement[];
  explicitMods: string[];
  secDescrText: string;
}

interface AdditionalProperty {
  name: string;
  values: (number | string)[][];
  displayMode: number;
  progress: number;
  type: number;
}

interface Property {
  name: string;
  values: (number | string)[][];
  displayMode: number;
  type?: number;
}

interface Socket {
  group: number;
  attr: string;
  sColour: string;
}

interface Requirement {
  name: string;
  values: (number | string)[][];
  displayMode: number;
}

interface Tab {
  n: string;
  i: number;
  id: string;
  type: string;
  hidden: boolean;
  selected: boolean;
  colour: Colour;
  srcL: string;
  srcC: string;
  srcR: string;
}

interface Colour {
  r: number;
  g: number;
  b: number;
}

@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.scss"]
})
export class DisplaylistComponent implements OnInit {
  // @ViewChild("paginator", { static: false }) paginator: MatPaginator;
  // @ViewChild("paginator2", { static: false }) paginator2: MatPaginator;
  displayedColumnstester: string[];
  currencyDataResponse;
  fragmentsDataResponse;
  oilsDataResponse;
  fossilsDataResponse;
  scarabsDataResponse;
  divsDataResponse;
  resonatorsDataResponse;
  propheciesDataResponse;
  uniqueweaponsDataResponse;
  uniquearmoursDataResponse;
  uniqueaccessoriesDataResponse;
  uniquejewelDataResponse;
  uniqueflaskDataResponse;
  essenceDataResponse;
  public POESESSID;
  public accountName;
  public characterName;
  public acountNameForString = "qqazraelz";
  public poessForString = "Null";
  public characterNameForString = "ZomboTD";
  public restcolumns: string[];
  public poeninjaData: any;
  public stashItems: any;
  public stashItems2: any;
  public characterItems: any;
  public charactersRequest: any;
  public images;
  public stashdata2;
  public stashdatarequest: RootObject[];
  public inter2: poeNinjaFullResponseInterface[];
  fullPoeNinjaResponse = new MatTableDataSource();
  fullPoeNinjaResponseTableSourceFossil = new MatTableDataSource();
  // public itemlist:any;
  sortedData: PoeNinjaItemData[];
  dataSource2;
  stashdatasource;
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
  fullPoeNinjaResponseTableSource;
  userForm = new FormGroup({
    POESESSID: new FormControl("***Replace***", Validators.maxLength(20)),
    accountName: new FormControl("qqazraelz", Validators.required),
    characterName: new FormControl("ZomboTD", Validators.maxLength(20))
  });
  accform = new FormControl(20, Validators.required);
  characterform = new FormControl();
  ngAfterViewInit() {
    // this.fullPoeNinjaResponseTableSourceFossil.paginator = this.paginator;
    // this.fullPoeNinjaResponseTableSource.paginator = this.paginator2;
  }
  // _setDataSource(indexNumber) {
  //   setTimeout(() => {
  //     switch (indexNumber) {
  //       case 0:
  //         !this.fullPoeNinjaResponseTableSourceFossil.paginator
  //           ? (this.fullPoeNinjaResponseTableSourceFossil.paginator = this.paginator)
  //           : null;
  //         break;
  //       case 1:
  //         !this.fullPoeNinjaResponseTableSource.paginator
  //           ? (this.fullPoeNinjaResponseTableSource.paginator = this.paginator2)
  //           : null;
  //     }
  //   }, 5000);
  // }

  // fetch = require("node-fetch");

  itemheaders: string[] = ["id", "name"];
  itemheadersTest: string[] = [
    // "artFilename",
    // "baseType",
    "icon",
    "name",
    "chaosValue",
    // "corrupted",
    // "count",
    // "detailsId",
    "exaltedValue",
    // "explicitModifiers",
    // "flavourText",
    // "gemLevel",
    // "gemQuality",

    "id"
    // "implicitModifiers",
    // "itemClass",
    // "itemType",
    // "levelRequired",
    // "links",
    // "lowConfidenceSparkline",
    // "mapTier",

    // "prophecyText",
    // "sparkline",
    // "stackSize",
    // "variant"
  ];
  itemheadersTest2: string[];
  derpcolums: string[] = ["items", "tabs", "quadLayout", "numTabs"];
  disptest: string[] = ["name", "icon", "inventoryId"];
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
  arrayOfKeys;
  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      POESESSID: "insert here"
    })
  };
  itemsdata3: any;
  stashurl: string;
  stashitemOBJ;
  constructor(
    private svc: PoeninjaapiService,
    private http: HttpClient,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private _electronService: ElectronService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}
  versions = { node: "", chrome: "", electron: "" };

  // public playPingPong() {
  //   if (this._electronService.isElectronApp) {
  //     let pong: string = this._electronService.ipcRenderer.sendSync("ping");
  //     console.log(pong);
  //   }
  // }

  // formattedMessage: string;
  // onChanges(): void {
  //   this.profileForm.valueChanges.subscribe(val => {
  //     console.log(val.POESESSID, val.accountName, val.characterName);
  //   });
  // }
  isDev = require("electron-is-dev");
  //isDevMode = process.execPath.match(/dist[\\/]electron/i);
  openModal() {
    console.log("Play");
    if (this._electronService.isElectronApp) {
      // We have access to node process.
      this.versions.node = this._electronService.process.versions.node;
      this.versions.chrome = this._electronService.process.versions.chrome;
      this.versions.electron = this._electronService.process.versions.electron;
      console.log(this.versions, "versions");
    }
    this._electronService.ipcRenderer.on("ping-async", (event, resp, resp2) => {
      // prints "pong"
      console.log(resp);
      console.log(resp2, "resp2");
      this.stashdatarequest = resp;

      this.currencyDataResponse = resp2[0].data; // currency
      this.fragmentsDataResponse = resp2[1].data; //frag
      this.oilsDataResponse = resp2[2].data; //oils
      this.fossilsDataResponse = resp2[3].data; //fossil
      this.resonatorsDataResponse = resp2[4].data; //reso
      this.scarabsDataResponse = resp2[5].data; //scarab
      this.divsDataResponse = resp2[6].data; //divs
      this.propheciesDataResponse = resp2[7].data; //prop
      this.uniquejewelDataResponse = resp2[8].data; //jewels
      this.uniqueweaponsDataResponse = resp2[9].data; //wapons
      this.uniquearmoursDataResponse = resp2[10].data; //armor
      this.uniqueaccessoriesDataResponse = resp2[11].data; //access
      this.uniqueflaskDataResponse = resp2[12].data; //flask
      this.essenceDataResponse = resp2[13].data; //essence
      console.log(resp2[3], "fossil Response");
      this.fullPoeNinjaResponse = resp2;
      this.fullPoeNinjaResponseTableSource = new MatTableDataSource(resp2);
      this.fullPoeNinjaResponseTableSourceFossil = new MatTableDataSource(
        resp2[3].lines
      );
      this.itemheadersTest2 = Object.keys(resp2[3].lines[0]); // get all headers
      console.log(this.itemheadersTest2);
      for (let entry of this.stashdatarequest) {
        console.log(entry, "items");
      }
      console.log(resp2[0].lines, "Currency?");
      console.log(this.stashdatarequest, "stashData Request");
      // this.derpcolums = Object.keys(resp[3].data);
      console.log(this.derpcolums);
      // console.log(resp2);
      console.log(this.fullPoeNinjaResponse, "Full Response");

      let stashdatasourceitems = resp.items;
      this.stashdatasource = new MatTableDataSource(resp);
      this.stashItems2 = new MatTableDataSource(stashdatasourceitems);
      this.arrayOfKeys = Object.keys(this.stashdatarequest);
      this.stashitemOBJ = Object;
      this.stashitemOBJ = this.stashdatarequest;
      this.refresh(); // makes the display look for changes aka our new data
    });

    this._electronService.ipcRenderer.send("ping-async", "ping");
  }

  onFormSubmit(): void {
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
    // this.openModal();

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

  refresh() {
    this.changeDetectorRefs.detectChanges();
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
interface poeNinjaFullResponseInterface {
  currencyDetails?: CurrencyDetail[];
  lines: Line[];
}

interface Line {
  chaosEquivalent?: number;
  currencyTypeName?: string;
  detailsId: string;
  lowConfidencePaySparkLine?: LowConfidencePaySparkLine;
  lowConfidenceReceiveSparkLine?: LowConfidenceReceiveSparkLine;
  pay?: Pay;
  paySparkLine?: LowConfidencePaySparkLine;
  receive?: Pay;
  receiveSparkLine?: LowConfidenceReceiveSparkLine;
  artFilename?: string;
  baseType?: string;
  chaosValue?: number;
  corrupted?: boolean;
  count?: number;
  exaltedValue?: number;
  explicitModifiers?: (ExplicitModifier | ExplicitModifier)[];
  flavourText?: string;
  gemLevel?: number;
  gemQuality?: number;
  icon?: string;
  id?: number;
  implicitModifiers?: ExplicitModifier[][];
  itemClass?: number;
  itemType?: string;
  levelRequired?: number;
  links?: number;
  lowConfidenceSparkline?: LowConfidenceSparkline;
  mapTier?: number;
  name?: string;
  prophecyText?: string;
  sparkline?: LowConfidenceSparkline;
  stackSize?: number;
  variant?: (null | string)[];
}

interface LowConfidenceSparkline {
  data: (null | number | number | number)[];
  totalChange: number;
}

interface ExplicitModifier {
  optional: boolean;
  text: string;
}

interface Pay {
  count: number;
  data_point_count: number;
  get_currency_id: number;
  id: number;
  includes_secondary: boolean;
  league_id: number;
  pay_currency_id: number;
  sample_time_utc: string;
  value: number;
}

interface LowConfidenceReceiveSparkLine {
  data: number[];
  totalChange: number;
}

interface LowConfidencePaySparkLine {
  data: (null | number | number)[];
  totalChange: number;
}

interface CurrencyDetail {
  icon: string;
  id: number;
  name: string;
  poeTradeId: number;
}
