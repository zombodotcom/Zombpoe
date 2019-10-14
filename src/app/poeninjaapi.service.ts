import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

import { from } from "rxjs";
import { get } from "http";
export interface Character {
  [index: number]: {
    string: {
      string: [number | string];
    };
  };
}

export interface Items {
  items: {
    name: string;
    icon: string;
  };
}

export interface CharacterData {
  items?: (ItemsEntity)[] | null;
  character: Character;
}
export interface ItemsEntity {
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
  properties?: (PropertiesEntity)[] | null;
  requirements?: (RequirementsEntity)[] | null;
  utilityMods?: (string)[] | null;
  explicitMods?: (string)[] | null;
  descrText: string;
  flavourText?: (string)[] | null;
  frameType: number;
  x: number;
  y: number;
  inventoryId: string;
}
export interface PropertiesEntity {
  name: string;
  values?:
    | (
        | (
            | string
            | number
            | string
            | number
            | string
            | number
            | string
            | number
            | string
            | number)[]
        | null)[]
    | null;
  displayMode: number;
  type?: number | null;
}
export interface RequirementsEntity {
  name: string;
  values?: ((string | number)[] | null)[] | null;
  displayMode: number;
}
export interface Character {
  name: string;
  league: string;
  classId: number;
  ascendancyClass: number;
  class: string;
  level: number;
  experience: number;
  lastActive: boolean;
}

@Injectable({
  providedIn: "root"
})
export class PoeninjaapiService {
  derp;
  baseURL = "https://poe.ninja/api/data/{}Overview?league={}&type={}";
  ninjaCurrencyTypes = ["Fragment", "Currency"];
  myObjStr = [];
  ninjaTypes = [
    "Oil",
    "Fossil",
    "Resonator",
    "Scarab",
    "Essence",
    "DivinationCard",
    "Prophecy",
    "UniqueJewel",
    "UniqueWeapon",
    "UniqueArmour",
    "UniqueAccessory",
    "UniqueFlask",
    "UniqueJewel"
  ];
  // poeapiSetup=[
  //   "https://www.pathofexile.com/character-window/get-account-name="

  //   "https://www.pathofexile.com/character-window/get-characters="

  //   "https://www.pathofexile.com/character-window/get-stash-items?league=[League] &tabs=1&tabIndex= [Stashnumber] &accountName= [AccountName]

  //  " http://www.pathofexile.com/character-window/get-items?character= [Charname] &accountName= [AccountName]
  // ]

  private privateurl =
    "https://bypasscors.herokuapp.com/api/?url=" +
    encodeURIComponent(
      "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil"
    );

  constructor(private http: HttpClient) {}
  private url =
    "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
  private devurl =
    "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
  // private poeCharactersUrl="https://www.pathofexile.com/character-window/get-account-name=";
  // private poeCharactersUrl = ""https://www.pathofexile.com/character-window/get-characters="";
  // private poeCharactersUrl = "https://www.pathofexile.com/character-window/get-account-name=";
  derplist = [];
  searchResult: any[];
  getPoeNinjaData(url): Observable<any> {
    console.log("Fetching Data");
    // httpProvider.defaults.useXDomain = true;
    let getfromNinja = this.http.get<any>(url);

    //change here for build
    // let getfromNinja = this.http.get<any>(this.devurl);
    // console.log(getfromNinja);

    //change here for build
    // let getfromNinja = this.http.get<any>(this.devurl);
    // console.log(JSON.stringify(getfromNinja));
    console.log("end data fetch");
    // let getOurStash = this.http.get<any>("");
    return getfromNinja;
  }

  // CharacterData: Promise<any>;
  getStashData(url): Observable<any> {
    // url = url.toLowerCase();
    console.log("Fetching Data");
    // httpProvider.defaults.useXDomain = true;
    let getfromNinja = this.http.get<any>(url).pipe(map(result => result));
    // this.http.get<any>(url).pipe(map(derpo => derpo));
    console.log("Inside");
    // console.log("derp", getfromNinja as any);
    // let getOurStash = this.http.get<any>("");

    return getfromNinja;
  }

  sendGetRequest(url) {
    return this.http.get<any>(url);
  }

  findAllShows(url): Observable<any> {
    return this.http.get(url).pipe(
      map((result: any) => {
        result;
        console.log(result, "derp1234");
      })
    );
  }

  getStashDataInterface(url): Observable<CharacterData[]> {
    // url = url.toLowerCase();
    console.log("Fetching Data Interfacte");

    // httpProvider.defaults.useXDomain = true;

    let getfromNinja = this.http
      .get<CharacterData[]>(url)
      .pipe(map(result => result));
    console.log("Inside");
    // this.http.get(url, { responseType: "json" }).subscribe(data => {
    //   // Data extraction from the HTTP response is already done
    //   // Display the result

    //   console.log("TJ user data", data);
    // });

    // console.log("derp", getfromNinja as any);
    // let getOurStash = this.http.get<any>("");

    return getfromNinja;
  }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     "Content-Type": "application/json",
  //     apikey: this.apikey,
  //     appkey: this.appkey
  //   }),
  //   params: new HttpParams().set("program_id", this.program_id)
  // };

  getUsers(url) {
    return this.http.get(url);
  }

  setUser(user, url) {
    let userId = user.id;
    delete user.id;
    return this.http.post(url, user);
  }

  getImages(url) {
    return this.http.get(url);
  }
}
