import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { BaseChartDirective } from "ng2-charts";
import { PoeninjaapiService, CharacterData } from "../poeninjaapi.service";
import { MatProgressBarModule } from "@angular/material";
import { DataSource } from "@angular/cdk/table";
import { Sort, MatSort } from "@angular/material/sort";
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
import {
  MatPaginator,
  MatTableDataSource,
  MatTabChangeEvent
} from "@angular/material";
import { Cookies, dialog } from "electron";
import { JsonPipe } from "@angular/common";
import { async } from "@angular/core/testing";
import { spawn } from "child_process";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { group } from "@angular/animations";
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
import { Chart } from "chart.js";

@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.scss"]
})

export class DisplaylistComponent implements OnInit {
  options3: { hi };
  selectedOptions3;

  lineChartData: ChartDataSets[] = JSON.parse(
    localStorage.getItem("networtharray")
  );

  lineChartLabels: Label[] = [
    JSON.parse(localStorage.getItem("networthlabels"))
  ];

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (evt, item) => {
      let index = item[0]["_index"];
      let datasetindex = item[0]["_datasetIndex"];
      // let fruit = item[0]["_chart"].data.labels[index];
      // let votes = item[0]["_chart"].data.datasets[0].data[index];
      console.log(item, index, datasetindex);
      // console.log(this.chart.chart);
      // this.chart.chart.update();
    }
  };
  public color: string = "rgba(233,32,233,0.2)";
  lineChartColors: Color[] = [
    {
      borderColor: this.color,
      backgroundColor: "rgba(233,32,233,0.2)",
      hoverBackgroundColor: this.color,
      hoverBorderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "#000000",
      pointBorderColor: "#FFFFFF"
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";
  firstload: boolean = false;
  displayedColumnstester: string[];
  public progressdownload = 0;
  public progressleft = 99;
  currencyDataResponse;
  fragmentsDataResponse;
  oilsDataResponse;
  fossilsDataResponse;
  scarabsDataResponse;
  divsDataResponse;
  chartArray;
  networtharray = [];
  networthlabels = [];
  resonatorsDataResponse;
  propheciesDataResponse;
  uniqueweaponsDataResponse;
  uniquearmoursDataResponse;
  uniqueaccessoriesDataResponse;
  uniquejewelDataResponse;
  uniqueflaskDataResponse;
  essenceDataResponse;
  incubatorDataResponse;
  giantpoeninjaarray;
  public networth;
  hide = true;
  stashnamearray = [];
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
  skillgemsDataResponse;

  fullPoeNinjaResponseTableSourceFossil = new MatTableDataSource(); //fossils
  fullPoeNinjaResponseTableSourceCurrency = new MatTableDataSource(); //currency
  fragmentsDataResponseTableSource = new MatTableDataSource(); //frag
  oilsDataResponseTableSource = new MatTableDataSource(); //oils
  fossilsDataResponseTableSource = new MatTableDataSource(); //fossil
  resonatorsDataResponseTableSource = new MatTableDataSource(); //reso
  scarabsDataResponseTableSource = new MatTableDataSource(); //scarab
  divsDataResponseTableSource = new MatTableDataSource(); //divs
  propheciesDataResponseTableSource = new MatTableDataSource(); //prop
  uniquejewelDataResponseTableSource = new MatTableDataSource(); //jewels
  uniqueweaponsDataResponseTableSource = new MatTableDataSource(); //wapons
  uniquearmoursDataResponseTableSource = new MatTableDataSource(); //armor
  uniqueaccessoriesDataResponseTableSource = new MatTableDataSource(); //access
  uniqueflaskDataResponseTableSource = new MatTableDataSource(); //flask
  essenceDataResponseTableSource = new MatTableDataSource(); //essence
  incubatorDataResponseTableSource = new MatTableDataSource(); //essence
  fullstashDataResponseSource = new MatTableDataSource(); //stash
  currenttablesource = new MatTableDataSource(); // storage for filter test
  skillgemsDataResponseTableSource = new MatTableDataSource(); //skillgems
  // public itemlist:any;
  sortedData: PoeNinjaItemData[];
  dataSource2;
  fullstashdataBigBoiArray;
  accountinfo;
  stashdatasource;
  arrayOfKeys;
  itemsdata3: any;
  stashurl: string;
  stashitemOBJ;
  cookieValue = "UNKNOWN";
  users2: CharacterData[];
  tester3: CharacterData;
  profileForm: FormGroup;
  devstashurl;
  showGraphOptionsStuff=true;
  showGraph=true;
  publicstashurl;
  usrNameChanges: string;
  usrNameStatus: string;
  requestOptions;
  githubversion="0.0.7";
  headerDict = {
    POESESSID: "null"
  };
  devurl;
  characteritemsurl;
  formattedMessage;
  fullPoeNinjaResponseTableSource;
  itemsearchtest = new FormGroup({
    itemsearchstring: new FormControl("Enter Item", Validators.maxLength(100))
  });
 openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 10000,
         panelClass: ['mat-toolbar', 'mat-primary']
      });
   } 
  appversioncheck(){
    var appVersion = require('electron').remote.app.getVersion();
    console.log(appVersion)
    
    this.http
      .get("https://api.github.com/repos/zombodotcom/zombpoe/releases/latest")
      .subscribe(
        data => {console.log('Latest Zombpoe Version', data['tag_name']); this.githubversion=data['tag_name']},
        error => console.log('oops Error', error),
      );
      console.log(this.githubversion,appVersion)
      if (this.githubversion==appVersion){
        console.log("Up to date!")
        this.openSnackBar('Up to Date',"Close")
      }
      else{
        this.openSnackBar('Update Available Download at https://github.com/zombodotcom/Zombpoe/releases',"Close")
      }
  }

  onChangeColor(color: string) {
    // console.log(color);
    let colorchange: Color[] = [
      {
        borderColor: this.color,
        backgroundColor: this.color,
        hoverBackgroundColor: this.color,
        hoverBorderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "#000000",
        pointBorderColor: "#FFFFFF"
      }
    ];
    this.lineChartColors = colorchange;
    this.refresh_chart();
  }
  // leagues: string[] = [
  //   "Standard",
  //   "Hardcore",
  //   "SSF Standard",
  //   "SSF Hardcore",
  //   "Hardcore Blight",
  //   "SSF Blight",
  //   "SSF Blight HC"
  // ];
  default: string = "Blight";
  userForm = new FormGroup({
    POESESSID: new FormControl(
      localStorage.getItem("POESESSID") != null
        ? localStorage.getItem("POESESSID")
        : "***REPLACE***",
      Validators.maxLength(32)
    ),
    accountName: new FormControl(
      localStorage.getItem("accountName") != null
        ? localStorage.getItem("accountName")
        : "***REPLACE***",
      Validators.maxLength(32)
    ),
    characterName: new FormControl("Not Used Yet", Validators.maxLength(25)),
    league: new FormControl(
      localStorage.getItem("league") != null
        ? localStorage.getItem("league")
        : "Blight",
      Validators.maxLength(32)
    )
    // league2: new FormControl("Blight")
    // worthCutoff: new FormControl("none", Validators.maxLength(20))
  });
  accform = new FormControl(20, Validators.required);
  characterform = new FormControl();
  // RefreshTime = new FormControl();
  intervals = new FormControl("1");
  intervalsList: string[] = ["1", "2", "3", "4", "5", "10"];

  // fetch = require("node-fetch");

  itemheaders: string[] = ["id", "name"];
  currencyHeaders: string[] = [
    "icon",
    "currencyTypeName",
    "chaosEquivalent",

    "detailsId",
    // "lowConfidencePaySparkLine",
    // "lowConfidenceReceiveSparkLine",
    "pay",
    // "paySparkLine",
    "receive"

    // "receiveSparkLine"
  ];

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

    // "flavourText",
    // "gemLevel",
    // "gemQuality",
    // "explicitModifiers",
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
  skillgemheaders: string[] = [
    // "artFilename",
    // "baseType",
    "icon",
    "name",
    "chaosValue",
    // "corrupted",
    // "count",
    // "detailsId",
    "exaltedValue",

    // "flavourText",
    // "gemLevel",
    // "gemQuality",
    // "explicitModifiers",
    "id",
    // "id",
    // "name",
    // "icon",
    // "mapTier",
    "levelRequired",
    // "baseType",
    // "stackSize",
    "variant",
    // "prophecyText",
    // "artFilename",
    // "links",
    // "itemClass",
    // "sparkline:Sparkline;",
    // "lowConfidenceSparkline:LowConfidenceSparkline;",
    // "implicitModifiers",
    // "explicitModifiers",
    // "flavourText",
    "corrupted",
    "gemLevel",
    "gemQuality"
    // "itemType",
    // "chaosValue",
    // "exaltedValue",
    // "count",
    // "detailsId",
  ];
  itemheadersTest2: string[];
  derpcolums: string[] = ["items", "tabs", "quadLayout", "numTabs"];
  disptest: string[] = ["name", "stackSize", "icon", "inventoryId", "worth"];
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

  // Sorters

  @ViewChild("MatSortcurrency", { static: false }) sortcurrency: MatSort;
  @ViewChild("MatSortfrag", { static: false }) sortfrag: MatSort;
  @ViewChild("MatSortoil", { static: false }) sortoil: MatSort;
  @ViewChild("MatSortfossil", { static: false }) sortfossil: MatSort;
  @ViewChild("MatSortresonator", { static: false }) sortresonator: MatSort;
  @ViewChild("MatSortscarab", { static: false }) sortscarab: MatSort;
  @ViewChild("MatSortessence", { static: false }) sortessence: MatSort;
  @ViewChild("MatSortdiv", { static: false }) sortdiv: MatSort;
  @ViewChild("MatSortprophecy", { static: false }) sortprophecy: MatSort;
  @ViewChild("MatSortjewel", { static: false }) sortjewel: MatSort;
  @ViewChild("MatSortweapon", { static: false }) sortweapon: MatSort;
  @ViewChild("MatSortarmour", { static: false }) sortarmour: MatSort;
  @ViewChild("MatSortaccess", { static: false }) sortaccess: MatSort;
  @ViewChild("MatSortflask", { static: false }) sortflask: MatSort;
  @ViewChild("MatSortincubator", { static: false }) sortincubator: MatSort;
  @ViewChild("MatSortstash", { static: false }) sortstash: MatSort;
  @ViewChild("MatSortskillgems", { static: false }) sortskillgems: MatSort;
  // Paginators
  @ViewChild("paginatorcurrency", { static: false })
  paginatorcurrency: MatPaginator;
  @ViewChild("paginatorfragment", { static: false })
  paginatorfragment: MatPaginator;
  @ViewChild("paginatorarmour", { static: false })
  paginatorarmour: MatPaginator;
  @ViewChild("paginatorweapons", { static: false })
  paginatorweapons: MatPaginator;
  @ViewChild("paginatorfossil", { static: false })
  paginatorfossil: MatPaginator;
  @ViewChild("paginatoroils", { static: false }) paginatoroils: MatPaginator;
  @ViewChild("paginatorfrag", { static: false }) paginatorfrag: MatPaginator;
  @ViewChild("paginatorreso", { static: false }) paginatorreso: MatPaginator;
  @ViewChild("paginatorscarabs", { static: false })
  paginatorscarabs: MatPaginator;
  @ViewChild("paginatoraccess", { static: false })
  paginatoraccess: MatPaginator;
  @ViewChild("paginatordivs", { static: false }) paginatordivs: MatPaginator;
  @ViewChild("paginatorproph", { static: false }) paginatorproph: MatPaginator;
  @ViewChild("paginatorjewel", { static: false }) paginatorjewel: MatPaginator;
  @ViewChild("paginatorflask", { static: false }) paginatorflask: MatPaginator;
  @ViewChild("paginatorskillgems", { static: false })
  paginatorskillgems: MatPaginator;

  @ViewChild("paginatoressence", { static: false })
  paginatoressence: MatPaginator;
  @ViewChild("paginatorincubator", { static: false })
  paginatorincubator: MatPaginator;
  @ViewChild("paginatorstash", { static: false })
  paginatorstash: MatPaginator;

  onLinkClick(event: MatTabChangeEvent) {
    // console.log("event => ", event);
    // console.log("index => ", event.index);
    // console.log("tab => ", event.tab);
    switch (event.index) {
      case 0:
        this.fullPoeNinjaResponseTableSourceCurrency.sort = this.sortcurrency;
        this.currenttablesource = this.fullPoeNinjaResponseTableSourceCurrency;
        // this.currenttablesource.sort = this.sort;
        break;

      case 1:
        this.fragmentsDataResponseTableSource.sort = this.sortfrag;
        this.currenttablesource = this.fragmentsDataResponseTableSource;
        // this.currenttablesource.sort = this.sort;
        break;

      case 2:
        this.currenttablesource = this.oilsDataResponseTableSource;
        this.oilsDataResponseTableSource.sort = this.sortoil;
        // this.currenttablesource.sort = this.sort;
        break;

      case 3:
        this.currenttablesource = this.fullPoeNinjaResponseTableSourceFossil;
        this.fullPoeNinjaResponseTableSourceFossil.sort = this.sortfossil;
        // this.currenttablesource.sort = this.sort;
        break;

      case 4:
        this.currenttablesource = this.resonatorsDataResponseTableSource;
        this.resonatorsDataResponseTableSource.sort = this.sortresonator;
        // this.currenttablesource.sort = this.sort;
        break;
      case 5:
        this.currenttablesource = this.scarabsDataResponseTableSource;
        this.scarabsDataResponseTableSource.sort = this.sortscarab;
        // this.currenttablesource.sort = this.sort;
        break;

      case 6:
        this.currenttablesource = this.essenceDataResponseTableSource;
        this.essenceDataResponseTableSource.sort = this.sortessence;
        // this.currenttablesource.sort = this.sort; // inneffective unless we use current table source
        break;

      case 7:
        this.currenttablesource = this.divsDataResponseTableSource;
        this.divsDataResponseTableSource.sort = this.sortdiv;
        // this.currenttablesource.sort = this.sort;
        break;

      case 8:
        this.currenttablesource = this.propheciesDataResponseTableSource;
        this.propheciesDataResponseTableSource.sort = this.sortprophecy;
        // this.currenttablesource.sort = this.sort;
        break;

      case 9:
        this.currenttablesource = this.uniquejewelDataResponseTableSource;
        this.uniquejewelDataResponseTableSource.sort = this.sortjewel;
        // this.currenttablesource.sort = this.sort;
        break;

      case 10:
        this.currenttablesource = this.uniqueweaponsDataResponseTableSource;
        this.uniqueweaponsDataResponseTableSource.sort = this.sortweapon;
        // this.currenttablesource.sort = this.sort;
        break;

      case 11:
        this.currenttablesource = this.uniquearmoursDataResponseTableSource;
        this.uniquearmoursDataResponseTableSource.sort = this.sortarmour;
        // this.currenttablesource.sort = this.sort;
        break;

      case 12:
        this.currenttablesource = this.uniqueaccessoriesDataResponseTableSource;
        this.uniqueaccessoriesDataResponseTableSource.sort = this.sortaccess;
        // this.currenttablesource.sort = this.sort;
        break;

      case 13:
        this.currenttablesource = this.uniqueflaskDataResponseTableSource;
        this.uniqueflaskDataResponseTableSource.sort = this.sortflask;
        // this.currenttablesource.sort = this.sort;
        break;

      case 14:
        this.currenttablesource = this.incubatorDataResponseTableSource;
        this.incubatorDataResponseTableSource.sort = this.sortincubator;
        // this.currenttablesource.sort = this.sort;
        break;
      case 15:
        this.currenttablesource = this.incubatorDataResponseTableSource;
        this.skillgemsDataResponseTableSource.sort = this.sortskillgems;
        // this.currenttablesource.sort = this.sort;
        break;
    }
    // console.log('tab => ', event);
  }

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  refresh_chart() {
    // this.chart.ngOnChanges({});

    let storedNetworth = JSON.parse(localStorage.getItem("networtharray"));
    let storedLabels = JSON.parse(localStorage.getItem("networthlabels"));
    // console.log(storedNetworth, "networtharray");
    // console.log(storedLabels, "networthlabels");
    // this.networtharray = storedNetworth;
    // this.networthlabels = storedLabels;
    // if (this.chart) {
    //   this.chart.chart.config.data.labels = this.networthlabels;
    //   this.chart.chart.update();

    //   setTimeout(() => {
    //     if (this.chart && this.chart.chart && this.chart.chart.config) {
    //       this.chart.chart.config.data.labels = this.networthlabels;
    //       this.chart.chart.update();
    //     }
    //   }, 100);
    // }
    Chart.defaults.global.defaultFontColor = "#fff";
    if (this.chart !== undefined) {
      this.chart.chart.destroy();
      this.chart.chart = null;

      this.chart.datasets = this.networtharray;
      this.chart.labels = this.networthlabels;
      this.chart.ngOnInit();
      // this.changeDetectorRefs.detectChanges();
    }
  }

  // docharts(){
  //  this.parseCharts();
  //       this.loadChart1();
  //       this.loadChart2();
  //   }

  // parseCharts() {
  //   //  if (this.barChartLabels != null) {
  //   //    this.barChartLabels.length = 0;
  //   //    for (let label of this.priceHistory.barChartLabels) {
  //   //      this.barChartLabels.push(label);
  //   //    }
  //   //  } else {
  //   //    this.barChartLabels = this.priceHistory.barChartLabels;
  //   //  }
  //     this.charts.forEach((child) => {
  //         this.chart.push(child);
  //     });
  //     //console.log(this.chart[0]);
  // }
  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.fullPoeNinjaResponseTableSourceCurrency.paginator
            ? (this.fullPoeNinjaResponseTableSourceCurrency.paginator = this.paginatorcurrency)
            : null;
          // console.log(this.currenttablesource);
          break;

        case 1:
          !this.fragmentsDataResponseTableSource.paginator
            ? (this.fragmentsDataResponseTableSource.paginator = this.paginatorfrag)
            : null;
          // console.log(this.currenttablesource);
          break;
        case 2:
          !this.oilsDataResponseTableSource.paginator
            ? (this.oilsDataResponseTableSource.paginator = this.paginatoroils)
            : null;
          break;
        case 3:
          !this.fullPoeNinjaResponseTableSourceFossil.paginator
            ? (this.fullPoeNinjaResponseTableSourceFossil.paginator = this.paginatorfossil)
            : null;
          break;
        case 4:
          !this.resonatorsDataResponseTableSource.paginator
            ? (this.resonatorsDataResponseTableSource.paginator = this.paginatorreso)
            : null;
          break;
        case 5:
          !this.scarabsDataResponseTableSource.paginator
            ? (this.scarabsDataResponseTableSource.paginator = this.paginatorscarabs)
            : null;
          break;
        case 6:
          !this.essenceDataResponseTableSource.paginator
            ? (this.essenceDataResponseTableSource.paginator = this.paginatoressence)
            : null;
          break;
        case 7:
          !this.divsDataResponseTableSource.paginator
            ? (this.divsDataResponseTableSource.paginator = this.paginatordivs)
            : null;
          break;
        case 8:
          !this.propheciesDataResponseTableSource.paginator
            ? (this.propheciesDataResponseTableSource.paginator = this.paginatorproph)
            : null;
          break;
        case 9:
          !this.uniquejewelDataResponseTableSource.paginator
            ? (this.uniquejewelDataResponseTableSource.paginator = this.paginatorjewel)
            : null;
          break;
        case 10:
          !this.uniqueweaponsDataResponseTableSource.paginator
            ? (this.uniqueweaponsDataResponseTableSource.paginator = this.paginatorjewel)
            : null;
          break;
        case 11:
          !this.uniquearmoursDataResponseTableSource.paginator
            ? (this.uniquearmoursDataResponseTableSource.paginator = this.paginatorarmour)
            : null;
          break;
        case 12:
          !this.uniqueaccessoriesDataResponseTableSource.paginator
            ? (this.uniqueaccessoriesDataResponseTableSource.paginator = this.paginatoraccess)
            : null;
          break;
        case 13:
          !this.uniqueflaskDataResponseTableSource.paginator
            ? (this.uniqueflaskDataResponseTableSource.paginator = this.paginatorflask)
            : null;
          break;
        case 14:
          !this.incubatorDataResponseTableSource.paginator
            ? (this.incubatorDataResponseTableSource.paginator = this.paginatorincubator)
            : null;
          break;
        case 15:
          !this.skillgemsDataResponseTableSource.paginator
            ? (this.skillgemsDataResponseTableSource.paginator = this.paginatorskillgems)
            : null;
          break;
        default:
          break;
      }
    }, 100);
  }

  ngAfterViewInit() {
    this.fullPoeNinjaResponseTableSourceFossil.paginator = this.paginatorcurrency;
    this.fullPoeNinjaResponseTableSourceCurrency.paginator = this.paginatorfragment;
    // this.uniquearmoursDataResponseTableSource.paginator = this.paginatorar;
    this.fragmentsDataResponseTableSource.paginator = this.paginatorfrag; //frag
    this.oilsDataResponseTableSource.paginator = this.paginatoroils; //oils
    this.fossilsDataResponseTableSource.paginator = this.paginatorfossil; //fossil
    this.resonatorsDataResponseTableSource.paginator = this.paginatorreso; //reso
    this.scarabsDataResponseTableSource.paginator = this.paginatorscarabs; //scarab
    this.divsDataResponseTableSource.paginator = this.paginatordivs; //divs
    this.propheciesDataResponseTableSource.paginator = this.paginatorproph; //proph
    this.uniquejewelDataResponseTableSource.paginator = this.paginatorjewel; //jewels
    this.uniqueweaponsDataResponseTableSource.paginator = this.paginatorweapons; //wapons
    this.uniquearmoursDataResponseTableSource.paginator = this.paginatorarmour; //armor
    this.uniqueaccessoriesDataResponseTableSource.paginator = this.paginatoraccess; //access
    this.uniqueflaskDataResponseTableSource.paginator = this.paginatorflask; //flask
    this.essenceDataResponseTableSource.paginator = this.paginatoressence; //essence
    this.incubatorDataResponseTableSource.paginator = this.paginatorincubator; //essence
    this.skillgemsDataResponseTableSource.paginator = this.paginatorskillgems; //essence
    this.refresh_chart();
  }

  constructor(
    public snackBar: MatSnackBar,
    private svc: PoeninjaapiService,
    private http: HttpClient,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private _electronService: ElectronService,
    private changeDetectorRefs: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}
  versions = { node: "", chrome: "", electron: "" };

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }

  // NINJA FIND

  worthfinder2(item) {
    if (item.worth) {
      return item.worth;
    }
    // console.log(item, "item");
    if (item.descrText) {
      if (
        item.descrText.includes(
          "Place into an item socket of the right colour to gain this skill"
        ) ||
        item.descrText.includes("This is a Support Gem")
      ) {
        console.log(["Gem", item]);
        return 0;
      }
    }
    let comparething;
    for (var i = 0; i < this.giantpoeninjaarray.length; i++) {
      // look for the entry with a matching `code` value
      // console.log(this.giantpoeninjaarray[i],item,"ninja and item");

      if (this.giantpoeninjaarray[i].name) {
        comparething = this.giantpoeninjaarray[i].name;
      }
      if (this.giantpoeninjaarray[i].currencyTypeName) {
        comparething = this.giantpoeninjaarray[i].currencyTypeName;
      }
      let linkscompare = this.giantpoeninjaarray[i].links
        ? this.giantpoeninjaarray[i].links
        : 0;
      // console.log(comparething, "comparething");
      // console.log(this.giantpoeninjaarray[i], "giantindex", item);
      // if (item.explicitMods && this.giantpoeninjaarray[i].explicitModifiers) {
      //   let keepit = false;

      //   for (let x = 0; x < item.explicitMods.length; x++) {
      //     if (item.explicitMods[i] == "Has 2 Abyssal Sockets") {
      //       keepit = true;
      //     }
      //   }
      //   for (
      //     let x = 0;
      //     x < this.giantpoeninjaarray[i].explicitModifiers.length;
      //     x++
      //   ) {
      //     if (
      //       this.giantpoeninjaarray[i].explicitModifiers[i] ==
      //       "Has 2 Abyssal Sockets"
      //     ) {
      //       keepit = true;
      //     }
      //   }

      //   for (let x = 0; x < item.explicitMods.length; x++) {
      //     if (item.explicitMods[i] == "Has 1 Abyssal Socket") {
      //       keepit = true;
      //     }
      //   }
      //   for (
      //     let x = 0;
      //     x < this.giantpoeninjaarray[i].explicitModifiers.length;
      //     x++
      //   ) {
      //     if (
      //       this.giantpoeninjaarray[i].explicitModifiers[i] ==
      //       "Has 1 Abyssal Socket"
      //     ) {
      //       keepit = true;
      //     }
      //   }

      //   console.log("explicit mods dont match");
      //   console.log(
      //     [item, "item"],
      //     [item.explicitMods, this.giantpoeninjaarray[i].explicitModifiers]
      //   );
      //   // if (!keepit) {
      //   //   continue;
      //   // }
      // }
      // if (this.giantpoeninjaarray[i].gemLevel) {

      if (comparething == item.typeLine || comparething == item.name) {
        // if (item.properties[1]) {
        //   if (item.properties[1].type == this.giantpoeninjaarray[i].gemLevel) {
        //     console.log([
        //       item.properties[1].type,
        //       this.giantpoeninjaarray[i].gemLevel
        //     ]);
        //     return this.giantpoeninjaarray[i].chaosValue
        //       ? this.giantpoeninjaarray[i].chaosValue
        //       : this.giantpoeninjaarray[i].chaosEquivalent;
        //   }
        // }

        // if (item.properties) {
        //   let gemlevelstash;
        //   let gemqualitystash;
        //   let tempvalitemstuff;
        //   for (let x = 0; x < item.properties.length; x++) {
        //     if (item.properties[x].name == "Level") {
        //       gemlevelstash = item.properties[x].values[0][0].toString();
        //       // if (gemlevelstash.includes(" (Max)")) {
        //       //   gemlevelstash = gemlevelstash.replace(" (Max)", "");
        //       // }
        //       if (
        //         item.properties[x].type !=
        //         this.giantpoeninjaarray[i].itemClass + 1
        //       ) {
        //         // tempvalitemstuff = [
        //         //   item.properties[x].type,
        //         //   this.giantpoeninjaarray[i].itemClass + 1
        //         // ];
        //         console.log([this.giantpoeninjaarray[i], item]);
        //         console.log("invalied item class and type continuing");
        //         continue;
        //       }
        //     }
        //     if (item.properties[x].name == "Quality") {
        //       // console.log(item.properties[x].type, "gem level?");
        //       gemqualitystash = item.properties[x].values[0][0].toString();
        //       // console.log(gemqualitystash)
        //       gemqualitystash = gemqualitystash.replace("+", "");
        //       gemqualitystash = gemqualitystash.replace("%", "");
        //     }
        //   }
        //   if (gemlevelstash >= this.giantpoeninjaarray[i].gemLevel) {
        //     console.log("greater level continue");
        //     continue;
        //   }
        //   if (gemqualitystash >= this.giantpoeninjaarray[i].gemQuality) {
        //     console.log("greater quality continue");
        //     continue;
        //   }
        //   if (gemlevelstash < this.giantpoeninjaarray[i].gemLevel) {
        //     console.log("gem level stash lower continue;");
        //     continue;
        //   }
        //   if (gemqualitystash < this.giantpoeninjaarray[i].gemQuality) {
        //     console.log("gem quality stash lower continue;");
        //     continue;
        //   }

        //   console.log([
        //     gemlevelstash,
        //     gemqualitystash,
        //     item,
        //     this.giantpoeninjaarray[i],
        //     tempvalitemstuff
        //   ]);
        //   if (
        //     this.giantpoeninjaarray[i].gemLevel <= gemlevelstash &&
        //     this.giantpoeninjaarray[i].gemQuality <= gemqualitystash
        //   ) {
        //     if (item.icon == this.giantpoeninjaarray[i].icon) {
        //       console.log([this.giantpoeninjaarray[i], item]);
        //     }
        // }
        // return 0;
        // }

        // console.log(
        //   [this.giantpoeninjaarray[i], "arr"],
        //   [this.giantpoeninjaarray[i].name, "name"],
        //   [this.giantpoeninjaarray[i].currencyTypeName, "typename"],
        //   [this.giantpoeninjaarray[i].chaosEquivalent, "cequiv"],
        //   [this.giantpoeninjaarray[i].chaosValue, "cval"],
        //   [item.stackSize, "stacksize"],
        //   [linkscompare, "Links"],
        //   [item, "item"]
        // );
        if (item.sockets) {
          if (item.sockets.length < this.giantpoeninjaarray[i].links) {
            // console.log("continue");
            continue;
          }
          let linkcounter;
          let grouparray = [];

          for (let x = 0; x < item.sockets.length; x++) {
            // console.log(item.sockets[x], "socket: " + x);
            grouparray.push(item.sockets[x].group);
          }
          let count = {};
          grouparray.forEach(function(i) {
            count[i] = (count[i] || 0) + 1;
          });
          var maxlinks = Object.keys(count).reduce(function(a, b) {
            return count[a] > count[b] ? a : b;
          });

          let linkcount = count[maxlinks];
          if (linkcount < 5) {
            linkcount = 0;
          }
          if (linkcount != this.giantpoeninjaarray[i].links) {
            // console.log("continue");
            // console.log([
            //   linkcount + " linkcount",
            //   this.giantpoeninjaarray[i].links,
            //   " ppoeninja.links"
            // ]);
            continue;
          }
          // console.log(
          //   ["group " + maxlinks, "maxlinks"],
          //   [grouparray, "grouparray"],
          //   [count, "count"],
          //   [linkcount, "count[maxlinks] < 5"]
          // );
          if (linkcount == this.giantpoeninjaarray[i].links) {
            if (
              item.explicitMods &&
              this.giantpoeninjaarray[i].explicitModifiers
            ) {
              if (item.explicitMods.indexOf("Has 1 Abyssal Socket") !== -1) {
                console.log("Has 1 Abyssal Socket");

                continue;
              }
              if (item.explicitMods.indexOf("Has 2 Abyssal Socket") !== -1) {
                // continue;
                if (
                  this.giantpoeninjaarray[i].explicitModifiers.indexOf(
                    "Has 2 Abyssal Socket"
                  ) !== -1
                ) {
                  console.log("Has 2 Abyssal Socket inside both! Pricing?");
                  return this.giantpoeninjaarray[i].chaosValue
                    ? this.giantpoeninjaarray[i].chaosValue
                    : this.giantpoeninjaarray[i].chaosEquivalent;
                }
                console.log(
                  "Has 2 Abyssal Socket this item might be worth something"
                );
              }
            }
            return this.giantpoeninjaarray[i].chaosValue
              ? this.giantpoeninjaarray[i].chaosValue
              : this.giantpoeninjaarray[i].chaosEquivalent;
          }
          // if (count[maxlinks] >= 5) {
          //   console.log("inside 5+");
          //   if (count[maxlinks] == this.giantpoeninjaarray[i].links) {
          //     return this.giantpoeninjaarray[i].chaosValue
          //       ? this.giantpoeninjaarray[i].chaosValue
          //       : this.giantpoeninjaarray[i].chaosEquivalent;
          //   }
          // }
          // if (count[maxlinks] < 5) {
          //   console.log("inside below 5");

          //   return this.giantpoeninjaarray[i].chaosValue
          //     ? this.giantpoeninjaarray[i].chaosValue
          //     : this.giantpoeninjaarray[i].chaosEquivalent;
          // }
        }

        return this.giantpoeninjaarray[i].chaosValue
          ? this.giantpoeninjaarray[i].chaosValue *
              (item.stackSize ? item.stackSize : 1)
          : this.giantpoeninjaarray[i].chaosEquivalent *
              (item.stackSize ? item.stackSize : 1);
      }

      // if (comparething === this.itemsearchtest.get("itemsearchstring").value) {
      //   // we found it
      //   // console.log(comparething);
      // }
      // // }
    }

    return 0;
  }

  worthfinder(item) {
    console.log(item);
    // let namecompare;
    // if (item.name != null) {
    //   namecompare = item.name;
    // }
    // if (item.currencyTypeName != null) {
    //   namecompare = item.currencyTypeName;
    // }
    // console.log(namecompare, "namecompare");
    // if (this.giantpoeninjaarray[i].currencyTypeName) {
    //   comparething = this.giantpoeninjaarray[i].currencyTypeName;
    // }
    // iterate over each element in the array
    let comparething;
    for (var i = 0; i < this.giantpoeninjaarray.length; i++) {
      // look for the entry with a matching `code` value
      // console.log(this.giantpoeninjaarray[i]);

      if (this.giantpoeninjaarray[i].name) {
        comparething = this.giantpoeninjaarray.name;
      }
      if (this.giantpoeninjaarray[i].currencyTypeName) {
        comparething = this.giantpoeninjaarray[i].currencyTypeName;
      }
      // console.log(comparething, "comparething");
      // console.log(
      //   this.giantpoeninjaarray[i].name,
      //   this.giantpoeninjaarray[i].currencyTypeName,
      //   "name and type"
      // );
      if (comparething == item.typeLine || comparething == item.name) {
        console.log(
          this.giantpoeninjaarray[i].name,
          this.giantpoeninjaarray[i].currencyTypeName,
          this.giantpoeninjaarray[i].chaosEquivalent,
          this.giantpoeninjaarray[i].chaosValue
        );
        return this.giantpoeninjaarray[i].chaosValue
          ? this.giantpoeninjaarray[i].chaosValue * item.stackSize
          : this.giantpoeninjaarray[i].chaosEquivalent * item.stackSize;
      }

      // if (comparething === this.itemsearchtest.get("itemsearchstring").value) {
      //   // we found it
      //   // console.log(comparething);
      // }
      // // }
    }

    // this.giantpoeninjaarray.find((o, i) => {
    //   // console.log(o);
    //   // console.log(o.lines);
    //   // o.find((z, i) => {

    //   // if (
    //   //   o.name === this.itemsearchtest.get("itemsearchstring").value ||
    //   //   o.currencyTypeName === this.itemsearchtest.get("itemsearchstring").value
    //   // ) {
    //     console.log(o);
    //     console.log(
    //       o.chaosValue + "chaos",
    //       o.exaltedValue + "ex",
    //       o.links + "links"
    //     );
    //   }
    //   // });
    // });
    return 0;
  }

  // console.log("done")

  isDev = require("electron-is-dev");
  //isDevMode = process.execPath.match(/dist[\\/]electron/i);
  getClassDerpo(item) {
    let iconstring;
    // console.log(item);
    this.fullPoeNinjaResponse[0].currencyDetails.find((o, i) => {
      // console.log("here", o);
      if (o.name == item) {
        // console.log("here", o.icon);
        iconstring = o.icon;
        // return iconstring; // stop searching
      }
    });

    // let obj = this.fullPoeNinjaResponse[0].currencyDetails.find((o, i) => {
    //   if (o.name == item) {
    //     console.log("here", i);
    //     return i; // stop searching
    //   }
    // });
    return iconstring;
  }

  getClassgetStashTooltip(item) {
    let iconstring;
    // console.log(item);
    this.fullstashdataBigBoiArray.find((o, i) => {
      // console.log("here", o);
      if (o.name == item) {
        // console.log("here", o.icon);
        iconstring = o.icon;
        // return iconstring; // stop searching
      }
    });

    // let obj = this.fullPoeNinjaResponse[0].currencyDetails.find((o, i) => {
    //   if (o.name == item) {
    //     console.log("here", i);
    //     return i; // stop searching
    //   }
    // });
    return iconstring;
  }

  applyFilter(filterValue: string) {
    this.currenttablesource.filter = filterValue.trim().toLowerCase();
    // console.log(this.currenttablesource);
  }
  applyFilterStash(filterValue: string) {
    this.fullstashDataResponseSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.currenttablesource);
  }
  applyFilterCurrencyCuttoff(filterValue: string) {
    this.fullstashDataResponseSource.filterPredicate = function(
      data,
      filter: string
    ): boolean {
      // return data.name.toLowerCase().includes(filter) || data.symbol.toLowerCase().includes(filter) || data.position.toString().includes(filter);
      console.log(data[0], "wut");
      return data[0].toLowerCase().includes(filter);
      // data.worth.toLowerCase().includes(filter) ||
      // data.explicitMods.toString().includes(filter)
    };
    // this.fullstashDataResponseSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.currenttablesource);
  }
  ConvertToJSON(item: any) {
    // return JSON.parse(JSON.stringify(item));
    console.log(item);
  }
  Object = Object;
  clearLocalStorage() {
    console.log("clearing LocalStorage");
    try {
      localStorage.clear();
      console.log("LocalStorage cleared");
    } catch (err) {
      console.log("couldnt clear? error:", err);
    }
    this.lineChartData = null;
    this.lineChartLabels = null;
    this.firstload = true;
    this.refresh_chart(); // wont work because we havent technically cleared
  }
  onloadSessionStorageData() {
    let tempstashvar;
    if (JSON.parse(localStorage.getItem("bigstasharray"))) {
      this.firstload = false;
      tempstashvar = JSON.parse(localStorage.getItem("bigstasharray"));
      this.fullstashDataResponseSource = new MatTableDataSource(
        tempstashvar ? tempstashvar : null
      );
      this.fullstashDataResponseSource.paginator = this.paginatorstash;
      this.fullstashDataResponseSource.sort = this.sortstash;
    } else {
      this.firstload = true;
    }

    if (JSON.parse(localStorage.getItem("poeninjarray"))) {
      this.firstload = false;
      let resp2 = JSON.parse(localStorage.getItem("poeninjarray"));
      // this.fullstashDataResponseSource = new MatTableDataSource(
      //   JSON.parse(localStorage.getItem("bigstasharray"))
      //     ? JSON.parse(localStorage.getItem("bigstasharray"))
      //     : null
      // );
      console.log(resp2, "poeNinja Items");
      console.log(tempstashvar, "your items");
      this.currencyDataResponse = resp2[0].data; // currency
      this.fragmentsDataResponse = resp2[1].data; //frag
      this.oilsDataResponse = resp2[2].data; //oils
      this.fossilsDataResponse = resp2[3].data; //fossil
      this.resonatorsDataResponse = resp2[4].data; //reso
      this.scarabsDataResponse = resp2[5].data; //scarab
      this.essenceDataResponse = resp2[6].data; //essence
      this.divsDataResponse = resp2[7].data; //divs
      this.propheciesDataResponse = resp2[8].data; //prop]
      this.uniquejewelDataResponse = resp2[9].data; //jewels
      this.uniqueweaponsDataResponse = resp2[10].data; //wapons
      this.uniquearmoursDataResponse = resp2[11].data; //armor
      this.uniqueaccessoriesDataResponse = resp2[12].data; //access
      this.uniqueflaskDataResponse = resp2[13].data; //flask
      this.incubatorDataResponse = resp2[14].data; //incubator
      this.skillgemsDataResponse = resp2[15].data; //skillgem

      this.fullPoeNinjaResponseTableSourceCurrency = new MatTableDataSource(
        resp2[0].lines
      ); // currency
      this.fragmentsDataResponseTableSource = new MatTableDataSource(
        resp2[1].lines
      ); //frag
      this.oilsDataResponseTableSource = new MatTableDataSource(resp2[2].lines); //oils
      this.fullPoeNinjaResponseTableSourceFossil = new MatTableDataSource(
        resp2[3].lines
      ); // fossils
      this.resonatorsDataResponseTableSource = new MatTableDataSource(
        resp2[4].lines
      ); //reso
      this.scarabsDataResponseTableSource = new MatTableDataSource(
        resp2[5].lines
      ); //scarab
      this.essenceDataResponseTableSource = new MatTableDataSource(
        resp2[6].lines
      ); //essence
      this.divsDataResponseTableSource = new MatTableDataSource(resp2[7].lines); //divs
      this.propheciesDataResponseTableSource = new MatTableDataSource(
        resp2[8].lines
      ); //prop
      this.uniquejewelDataResponseTableSource = new MatTableDataSource(
        resp2[9].lines
      ); //jewels
      this.uniqueweaponsDataResponseTableSource = new MatTableDataSource(
        resp2[10].lines
      ); //wapons
      this.uniquearmoursDataResponseTableSource = new MatTableDataSource(
        resp2[11].lines
      ); //armor
      this.uniqueaccessoriesDataResponseTableSource = new MatTableDataSource(
        resp2[12].lines
      ); //access
      this.uniqueflaskDataResponseTableSource = new MatTableDataSource(
        resp2[13].lines
      ); //flask
      this.incubatorDataResponseTableSource = new MatTableDataSource(
        resp2[14].lines
      ); //flask
      this.skillgemsDataResponseTableSource = new MatTableDataSource(
        resp2[15].lines
      ); //skillgems

      // console.log(resp2[3], "fossil Response");
      this.fullPoeNinjaResponse = resp2;
      this.fullPoeNinjaResponseTableSource = new MatTableDataSource(resp2);
    } else {
      this.firstload = true;
    }

    this.changeDetectorRefs.detectChanges();
  }
  forceRefresh() {
    console.log("Play");

    if (this._electronService.isElectronApp) {
      // We have access to node process.
      this.versions.node = this._electronService.process.versions.node;
      this.versions.chrome = this._electronService.process.versions.chrome;
      this.versions.electron = this._electronService.process.versions.electron;
      console.log(this.versions, "versions");
    }

    //Update the progress bar

    let localstorageAccountData = JSON.parse(
      localStorage.getItem("AccountData")
    );
    localStorage.setItem("POESESSID", this.userForm.get("POESESSID").value);
    localStorage.setItem("accountName", this.userForm.get("accountName").value);
    localStorage.setItem("league", this.userForm.get("league").value);
    // console.log(localStorage.getItem("league"), "league name");
    this._electronService.ipcRenderer.send("ping-async", [
      // localStorage.length > 0
      //   ? localstorageAccountData.POESESSID
      this.userForm.get("POESESSID").value,
      // localStorage.length > 0
      //   ? localstorageAccountData.accountName
      this.userForm.get("accountName").value,
      // localStorage.length > 0
      //   ? localstorageAccountData.accountName
      this.userForm.get("league").value
      // this.userForm.get("worthCutoff").value

      //   this.userForm.get("league").value
    ]); // get us data
  }

  onStashesOnlySubmit(): void {
    if (this._electronService.isElectronApp) {
      // We have access to node process.
      this.versions.node = this._electronService.process.versions.node;
      this.versions.chrome = this._electronService.process.versions.chrome;
      this.versions.electron = this._electronService.process.versions.electron;
      console.log(this.versions, "versions");
    }
    this._electronService.ipcRenderer.on("ping-async-stash", (event, resp) => {
      console.log(resp);
    });

    this._electronService.ipcRenderer.send("only-character-data", [
      // localStorage.length > 0
      //   ? localstorageAccountData.POESESSID
      this.userForm.get("POESESSID").value,
      // localStorage.length > 0
      //   ? localstorageAccountData.accountName
      this.userForm.get("accountName").value,
      // localStorage.length > 0
      //   ? localstorageAccountData.accountName
      this.userForm.get("league").value
      //   this.userForm.get("league").value
      //add new values here like tab # or a list of user specified tabs
    ]); // get us data

    this._electronService.ipcRenderer.on("ping-async", (event, resp, resp2) => {
      // prints "pong"
      console.log(resp, resp2);

      let bigboyarray2 = [];
      if (resp2) {
        for (let x = 0; x < resp2.length; x++) {
          // console.log(resp3[x].data.items);
          if (resp2[x].data.items) {
            bigboyarray2.push(resp2[x].data.items);
          }
        }
      }
      let bigarrayconcat = [].concat(bigboyarray2);
      let biggestitemarrayever = [];
      for (var i = 0; i < bigarrayconcat.length; ++i) {
        for (var j = 0; j < bigarrayconcat[i].length; ++j)
          biggestitemarrayever.push(bigarrayconcat[i][j]);
      }
      this.fullstashdataBigBoiArray = biggestitemarrayever;

      // this.itemheadersTest2 = Object.keys(resp2[3].lines[0]); // get all headers
      // console.log(this.itemheadersTest2);
      // for (let entry of this.stashdatarequest) {
      //   console.log(entry, "items");
      // }
      // console.log(resp2[0].lines, "Currency?");
      console.log(this.stashdatarequest, "stashData Request");

      // let stashdatasourceitems = resp.items;
      this.stashdatasource = new MatTableDataSource(resp);
      // this.stashItems2 = new MatTableDataSource(stashdatasourceitems);

      this.refresh(); // makes the display look for changes aka our new data
    });
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
  timerID;
  getselectedtabsforsend() {
    return this.tabnamesform.value;
  }
  stashinterval() {
    let thisboi = this;
    // function getselectedtabsforsend() {
    //   return this.tabnamesform.value;
    // }
    console.log("starting", this.intervals.value, new Date().toLocaleString());
    this.timerID = setInterval(function() {
      console.log("every 60 seconds: " + new Date().toLocaleString());
      console.log(thisboi.tabnamesform.value);
    }, 60 * 1000 * thisboi.intervals.value);
  }
  stopinterval() {
    clearInterval(this.timerID);
  }

  updateName() {
    console.log(this.POESESSID.value);
    console.log(this.accountName.value);
  }
  //   stashprogressget(){
  //     return this.progressdownload;
  // }

  // stashprogressset(resp){
  //     this.progressdownload = !isNaN(Math.round((resp[0] / resp[1]) * 100))?Math.round((resp[0] / resp[1]) * 100):0;
  // }

  getTabNames() {
    console.log("hello");

    this._electronService.ipcRenderer.send("get-stash-names", [
      // localStorage.length > 0
      //   ? localstorageAccountData.POESESSID
      this.userForm.get("POESESSID").value,
      // localStorage.length > 0
      //   ? localstorageAccountData.accountName
      this.userForm.get("accountName").value,
      // localStorage.length > 0
      //   ? localstorageAccountData.accountName
      this.userForm.get("league").value
      // this.userForm.get("worthCutoff").value
      //   this.userForm.get("league").value
    ]); // get us data
  }

  fn60sec() {
    // runs every 60 sec and runs on init.
    console.log("every 60 seconds: " + new Date().toLocaleString());
  }
  ngOnInit() {
    // var storedLabels = JSON.parse(localStorage.getItem("networthlabels"));
    // for (let i = storedLabels; i >= 0; i--) {
    //   this.lineChartLabels.push(storedLabels[i]);
    // }
    // console.log(storedLabels);
    // this.fullJSON.parse(localStorage.getItem("bigstasharray"));
    // this.autoupdatersetup();
    // let counter1 = 0;

    ////// every 60 seconds function.
    // this.fn60sec();
    // setInterval(this.fn60sec, 60 * 1000);

    // clearInterval(timerID); // The setInterval it cleared and doesn't run anymore.
    console.log(JSON.parse(localStorage.getItem("networtharray")));
    let storedNetworth = JSON.parse(localStorage.getItem("networtharray"));
    let storedLabels = JSON.parse(localStorage.getItem("networthlabels"));
    console.log(storedNetworth, "networtharray");
    console.log(storedLabels, "networthlabels");
    this.networtharray = storedNetworth;
    this.networthlabels = storedLabels;
    //get the stashes
    // if (storedLabels) {
    //   this._electronService.ipcRenderer.send("get-stash-names", [
    //     // localStorage.length > 0
    //     //   ? localstorageAccountData.POESESSID
    //     this.userForm.get("POESESSID").value,
    //     // localStorage.length > 0
    //     //   ? localstorageAccountData.accountName
    //     this.userForm.get("accountName").value,
    //     // localStorage.length > 0
    //     //   ? localstorageAccountData.accountName
    //     this.userForm.get("league").value
    //     // this.userForm.get("worthCutoff").value
    //     //   this.userForm.get("league").value
    //   ]); // get us data
    // }

    // console.log(this.chartArray);
    this.pingresponsesetter();
    // this.forceRefresh(); // run the button
    // let testersss = [0, 10, 20, 30, 40, 50, 60, 70, 80];
    // localStorage.setItem("tester", JSON.stringify(testersss));
    // this.refresh_chart();
    // console.log("Before");
    // console.log(
    //   JSON.parse(localStorage.getItem("networtharray")),
    //   "stored net worth"
    // );
    // console.log(
    //   JSON.parse(localStorage.getItem("networthlabels")),
    //   "stored net worth labels"
    // );

    // console.log(storedNetworth);
    let derplist;
    this._electronService.ipcRenderer.on(
      "ping-async-stashprogressbar",
      (event, resp) => {
        // console.log(resp,"ping-async-stashprogressbar");
        // stashprogressset(resp);
        // stashprogressget();
        // let buffer = !isNaN(Math.round((resp[0] / resp[1]) * 100))
        //   ? Math.round((resp[0] / resp[1]) * 100)
        //   : 100;
        // buffer = 100 - buffer;
        // console.log(buffer);
        setTimeout(() => {
          this.progressdownload = !isNaN(Math.round((resp[0] / resp[1]) * 100))
            ? Math.round((resp[0] / resp[1]) * 100)
            : 0;
          // this.progressleft = 99;
        }, 100);
        // setTimeout(() => { this.progressdownload =!isNaN((Math.round((resp[0] / resp[1]) * 100))?Math.round((resp[0] / resp[1]) * 100):0); }, 100);

        this.changeDetectorRefs.detectChanges();
      }
    );
    ///end of on init
    this.refresh();

    console.log(this.userForm.get("league").value);
    // this.changeDetectorRefs.detectChanges();
    this.onloadSessionStorageData(); // loads the old stash data
  }
  reloadWindowOnFirst() {
    location.reload();
  }

  getselectedtabs() {
    console.log(this.tabnamesform.value);
    console.log(this.intervals.value);
  }
  refresh() {
    this.changeDetectorRefs.detectChanges();
    // this.refresh_chart();
  }
  tabnamesform = new FormControl();
  tabslist: string[] = [];
  pingresponsesetter() {
    this._electronService.ipcRenderer.on("ping-async-stash", (event, resp) => {
      console.log(resp);
    });
    this._electronService.ipcRenderer.on("get-stash-names", (event, resp) => {
      console.log(resp[0]);
      let stashnames = [];
      this.tabnamesform = new FormControl();
      this.tabslist = [];
      for (let x = 0; x < resp[0].tabs.length; x++) {
        console.log(resp[0].tabs[x].n);
        this.tabslist.push(resp[0].tabs[x]);
      }
      // this.selectedOptions3 = new FormControl(this.stashnamearray);
    });
    this._electronService.ipcRenderer.on(
      "get-individual-tabs",
      (event, resp) => {
        console.log(resp[0]);
        // let stashnames = [];
        // this.tabnamesform = new FormControl();
        // this.tabslist = [];
        // for (let x = 0; x < resp[0].tabs.length; x++) {
        //   console.log(resp[0].tabs[x].n);
        //   this.tabslist.push(resp[0].tabs[x]);
        // }
        // this.selectedOptions3 = new FormControl(this.stashnamearray);
      }
    );

    this._electronService.ipcRenderer.on(
      "ping-async",
      (event, resp, resp2, resp3) => {
        // prints "pong"
        console.log(resp);
        console.log(resp2, "resp2");
        console.log(resp3, "resp3");
        let bigboyarray2 = [];
        if (resp3) {
          for (let x = 0; x < resp3.length; x++) {
            // console.log(resp3[x].data.items);
            if (resp3[x].data.items) {
              bigboyarray2.push(resp3[x].data.items);
            }
          }
        }

        let bigarrayconcat = [].concat(bigboyarray2);
        let biggestitemarrayever = [];
        for (var i = 0; i < bigarrayconcat.length; ++i) {
          for (var j = 0; j < bigarrayconcat[i].length; ++j)
            biggestitemarrayever.push(bigarrayconcat[i][j]);
        }
        this.fullstashdataBigBoiArray = biggestitemarrayever;

        let poefullarray = [];
        for (let x = 0; x < resp2.length; x++) {
          // console.log(resp2[x].lines);
          if (resp2[x].lines) {
            poefullarray.push(resp2[x].lines);
          }
        }
        console.log(poefullarray, "FullArray");
        let bigconcatpoefullarray = [].concat(poefullarray);
        let biggestpoeninjarrayever = [];
        for (var i = 0; i < bigconcatpoefullarray.length; ++i) {
          for (var j = 0; j < bigconcatpoefullarray[i].length; ++j)
            biggestpoeninjarrayever.push(bigconcatpoefullarray[i][j]);
        }

        this.giantpoeninjaarray = biggestpoeninjarrayever;

        console.log(biggestpoeninjarrayever, "biggestpoeninjarrayever");
        console.log(this.fullstashdataBigBoiArray, "Big Boi");
        this.networth = 0;
        for (let x = 0; x < this.fullstashdataBigBoiArray.length; x++) {
          // console.log(this.fullstashdataBigBoiArray[x], "before push");
          let worthpush = this.worthfinder2(this.fullstashdataBigBoiArray[x]);
          // if (this.userForm.get("worthCutoff").value == "none") {
          //   this.fullstashdataBigBoiArray[x].worth = worthpush
          // }
          // if (this.fullstashdataBigBoiArray[x].)
          this.fullstashdataBigBoiArray[x].worth = worthpush;
          // if (this.userForm.get("worthCutoff").value > worthpush) {
          //   delete this.fullstashdataBigBoiArray[x]
          // }

          this.networth += Number(
            parseFloat(
              this.fullstashdataBigBoiArray[x].worth.toString()
            ).toFixed(3)
          );

          // console.log(this.fullstashdataBigBoiArray[x], "afterpush");
        }
        // let testersss = [0, 10, 20, 30, 40, 50, 60, 70, 80];
        this.networtharray = JSON.parse(localStorage.getItem("networtharray"));

        if (this.networtharray == null) {
          this.networtharray = [{ data: [this.networth], label: "net Worth" }];
        } else {
          this.networtharray[0].data.push(this.networth);
          // this.networtharray[0].label.push(new Date().toLocaleString());
          // this.networtharray[0].label.push(Date());
        }
        this.networthlabels = JSON.parse(
          localStorage.getItem("networthlabels")
        );
        if (this.networthlabels == null) {
          this.networthlabels = [new Date().toLocaleString()];
        } else {
          this.networthlabels.push(new Date().toLocaleString());
          // this.networthlabels[0].push(this.networth+"test");
        }

        // this.lineChartLabels = [""];

        // for (let i = 0; i < this.networtharray[0].label.length; i++) {
        //   this.lineChartLabels.push(this.networtharray[i].label);
        // }
        localStorage.setItem(
          "networtharray",
          JSON.stringify(this.networtharray)
        );
        localStorage.setItem(
          "networthlabels",
          JSON.stringify(this.networthlabels)
        );
        let storedNetworth = JSON.parse(localStorage.getItem("networtharray"));
        let storedLabels = JSON.parse(localStorage.getItem("networthlabels"));
        console.log(storedNetworth, "networtharray");
        console.log(storedLabels, "networthlabels");
        // this.networtharray = storedNetworth;
        // this.networthlabels = storedLabels;

        this.fullstashDataResponseSource = new MatTableDataSource(
          this.fullstashdataBigBoiArray
        );
        this.fullstashDataResponseSource.paginator = this.paginatorstash;
        this.fullstashDataResponseSource.sort = this.sortstash;
        localStorage.setItem(
          "bigstasharray",
          JSON.stringify(this.fullstashdataBigBoiArray)
        );

        // when we do
        localStorage.setItem("poeninjarray", JSON.stringify(resp2));
        // localStorage.setItem(
        //   "stashpaginator",
        //   JSON.stringify(this.paginatorstash)
        // );
        // localStorage.setItem(
        //   "stashsort",
        //   JSON.stringify(this.sortstash)
        // );
        // localStorage.setItem(
        //   "stashtablesource",
        //   JSON.stringify(this.fullstashDataResponseSource)
        // );

        this.stashdatarequest = resp;
        this.currencyDataResponse = resp2[0].data; // currency
        this.fragmentsDataResponse = resp2[1].data; //frag
        this.oilsDataResponse = resp2[2].data; //oils
        this.fossilsDataResponse = resp2[3].data; //fossil
        this.resonatorsDataResponse = resp2[4].data; //reso
        this.scarabsDataResponse = resp2[5].data; //scarab
        this.essenceDataResponse = resp2[6].data; //essence
        this.divsDataResponse = resp2[7].data; //divs
        this.propheciesDataResponse = resp2[8].data; //prop]
        this.uniquejewelDataResponse = resp2[9].data; //jewels
        this.uniqueweaponsDataResponse = resp2[10].data; //wapons
        this.uniquearmoursDataResponse = resp2[11].data; //armor
        this.uniqueaccessoriesDataResponse = resp2[12].data; //access
        this.uniqueflaskDataResponse = resp2[13].data; //flask
        this.incubatorDataResponse = resp2[14].data; //incubator

        this.fullPoeNinjaResponseTableSourceCurrency = new MatTableDataSource(
          resp2[0].lines
        ); // currency
        this.fragmentsDataResponseTableSource = new MatTableDataSource(
          resp2[1].lines
        ); //frag
        this.oilsDataResponseTableSource = new MatTableDataSource(
          resp2[2].lines
        ); //oils
        this.fullPoeNinjaResponseTableSourceFossil = new MatTableDataSource(
          resp2[3].lines
        ); // fossils
        this.resonatorsDataResponseTableSource = new MatTableDataSource(
          resp2[4].lines
        ); //reso
        this.scarabsDataResponseTableSource = new MatTableDataSource(
          resp2[5].lines
        ); //scarab
        this.essenceDataResponseTableSource = new MatTableDataSource(
          resp2[6].lines
        ); //essence
        this.divsDataResponseTableSource = new MatTableDataSource(
          resp2[7].lines
        ); //divs
        this.propheciesDataResponseTableSource = new MatTableDataSource(
          resp2[8].lines
        ); //prop
        this.uniquejewelDataResponseTableSource = new MatTableDataSource(
          resp2[9].lines
        ); //jewels
        this.uniqueweaponsDataResponseTableSource = new MatTableDataSource(
          resp2[10].lines
        ); //wapons
        this.uniquearmoursDataResponseTableSource = new MatTableDataSource(
          resp2[11].lines
        ); //armor
        this.uniqueaccessoriesDataResponseTableSource = new MatTableDataSource(
          resp2[12].lines
        ); //access
        this.uniqueflaskDataResponseTableSource = new MatTableDataSource(
          resp2[13].lines
        ); //flask
        this.incubatorDataResponseTableSource = new MatTableDataSource(
          resp2[14].lines
        ); //flask

        // console.log(resp2[3], "fossil Response");
        this.fullPoeNinjaResponse = resp2;
        this.fullPoeNinjaResponseTableSource = new MatTableDataSource(resp2);

        // this.itemheadersTest2 = Object.keys(resp2[3].lines[0]); // get all headers
        // console.log(this.itemheadersTest2);
        // for (let entry of this.stashdatarequest) {
        //   console.log(entry, "items");
        // }
        // console.log(resp2[0].lines, "Currency?");
        console.log(this.stashdatarequest, "stashData Request");
        // this.derpcolums = Object.keys(resp[3].data);
        // console.log(this.derpcolums);
        // console.log(resp2);
        console.log(this.fullPoeNinjaResponse, "Full Response");
        // if (resp.items) {
        //   let stashdatasourceitems = resp.items;
        // }
        // this.refresh_chart();
        if (resp) {
          this.stashdatasource = new MatTableDataSource(resp);
        } else {
          console.warn("no Stash data");
        }

        // this.stashItems2 = new MatTableDataSource(stashdatasourceitems);
        // this.arrayOfKeys = Object.keys(this.stashdatarequest);
        // this.stashitemOBJ = Object;
        // this.stashitemOBJ = this.stashdatarequest;
        this.refresh(); // makes the display look for changes aka our new data
        this.refresh_chart();
      }
    );
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
