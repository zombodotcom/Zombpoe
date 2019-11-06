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

@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.scss"]
})
export class DisplaylistComponent implements OnInit {
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
  incubatorDataResponse;
  giantpoeninjaarray;
  public networth = 0;
  hide = true;
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
  fullstashDataResponseSource = new MatTableDataSource();
  currenttablesource = new MatTableDataSource(); // storage for filter test
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
  itemsearchtest = new FormGroup({
    itemsearchstring: new FormControl("Enter Item", Validators.maxLength(100))
  });
  userForm = new FormGroup({
    POESESSID: new FormControl("***Replace***", Validators.maxLength(32)),
    accountName: new FormControl("qqazraelz", Validators.required),
    characterName: new FormControl("ZomboTD", Validators.maxLength(20))
  });
  accform = new FormControl(20, Validators.required);
  characterform = new FormControl();

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
    }
    // console.log('tab => ', event);
  }

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
  }

  constructor(
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
    console.log(item, "item");

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
      // if (item.explicitMods) {
      //   if (
      //     item.explicitMods[0] !=
      //     this.giantpoeninjaarray[i].explicitModifiers[0]
      //   ) {
      //     console.log("explicit mods dont match");
      //     console.log(
      //       [item, "item"],
      //       [item.explicitMods, this.giantpoeninjaarray[i].explicitModifiers]
      //     );
      //     continue;
      //   }
      // }
      if (comparething == item.typeLine || comparething == item.name) {
        console.log(
          [this.giantpoeninjaarray[i], "arr"],
          [this.giantpoeninjaarray[i].name, "name"],
          [this.giantpoeninjaarray[i].currencyTypeName, "typename"],
          [this.giantpoeninjaarray[i].chaosEquivalent, "cequiv"],
          [this.giantpoeninjaarray[i].chaosValue, "cval"],
          [item.stackSize, "stacksize"],
          [linkscompare, "Links"],
          [item, "item"]
        );
        if (item.sockets) {
          if (item.sockets.length < this.giantpoeninjaarray[i].links) {
            console.log("continue");
            continue;
          }
          let linkcounter;
          let grouparray = [];

          for (let x = 0; x < item.sockets.length; x++) {
            console.log(item.sockets[x], "socket: " + x);
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
            console.log("continue");
            console.log([
              linkcount + " linkcount",
              this.giantpoeninjaarray[i].links,
              " ppoeninja.links"
            ]);
            continue;
          }
          console.log(
            ["group " + maxlinks, "maxlinks"],
            [grouparray, "grouparray"],
            [count, "count"],
            [linkcount, "count[maxlinks] < 5"]
          );
          if (linkcount == this.giantpoeninjaarray[i].links) {
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
  getClass(item) {
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
  applyFilter(filterValue: string) {
    this.currenttablesource.filter = filterValue.trim().toLowerCase();
    // console.log(this.currenttablesource);
  }
  applyFilterStash(filterValue: string) {
    this.fullstashDataResponseSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.currenttablesource);
  }
  openModal() {
    console.log("Play");

    if (this._electronService.isElectronApp) {
      // We have access to node process.
      this.versions.node = this._electronService.process.versions.node;
      this.versions.chrome = this._electronService.process.versions.chrome;
      this.versions.electron = this._electronService.process.versions.electron;
      console.log(this.versions, "versions");
    }

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
            console.log(resp3[x].data.items);
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
          console.log(resp2[x].lines);
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
        for (let x = 0; x < this.fullstashdataBigBoiArray.length; x++) {
          // console.log(this.fullstashdataBigBoiArray[x], "before push");
          this.fullstashdataBigBoiArray[x].worth = this.worthfinder2(
            this.fullstashdataBigBoiArray[x]
          );
          this.networth += Number(this.fullstashdataBigBoiArray[x].worth);
          // console.log(this.fullstashdataBigBoiArray[x], "afterpush");
        }

        this.fullstashDataResponseSource = new MatTableDataSource(
          this.fullstashdataBigBoiArray
        );

        this.fullstashDataResponseSource.paginator = this.paginatorstash;
        this.fullstashDataResponseSource.sort = this.sortstash;
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
        this.uniqueflaskDataResponse = resp2[14].data; //incubator

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

        console.log(resp2[3], "fossil Response");
        this.fullPoeNinjaResponse = resp2;
        this.fullPoeNinjaResponseTableSource = new MatTableDataSource(resp2);

        this.itemheadersTest2 = Object.keys(resp2[3].lines[0]); // get all headers
        console.log(this.itemheadersTest2);
        for (let entry of this.stashdatarequest) {
          console.log(entry, "items");
        }
        // console.log(resp2[0].lines, "Currency?");
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
      }
    );

    let localstorageAccountData = JSON.parse(
      localStorage.getItem("AccountData")
    );

    this._electronService.ipcRenderer.send("ping-async", [
      localStorage.length > 0
        ? localstorageAccountData.POESESSID
        : this.userForm.get("POESESSID").value,
      localStorage.length > 0
        ? localstorageAccountData.accountName
        : this.userForm.get("accountName").value
    ]); // get us data
  }

  onFormSubmit(): void {}

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
    this.openModal(); // run the button

    console.log("Before");

    let derplist;

    ///end of on init
    this.refresh();
  }

  refresh() {
    this.changeDetectorRefs.detectChanges();
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
