import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

import { from } from "rxjs";
import { get } from "http";
export interface Character {
  table: string;
  name: string;
  datatype: string;
}

export interface Items {
  name: string;
}

export interface BlacklistData {
  character: Character[];
  items: Items[];
}

@Injectable({
  providedIn: "root"
})
export class PoeninjaapiService {
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
  getPoeNinjaData(url): Observable<any> {
    console.log("Fetching Data");
    // httpProvider.defaults.useXDomain = true;
    let getfromNinja = this.http.get<any>(url);

    //change here for build
    // let getfromNinja = this.http.get<any>(this.devurl);
    // console.log(getfromNinja);

    //change here for build
    // let getfromNinja = this.http.get<any>(this.devurl);
    // console.log(JSON.stringify(getfromNinja.lines));
    console.log("end data fetch");
    // let getOurStash = this.http.get<any>("");
    return getfromNinja;
  }

  // BlackListData: Promise<any>;
  getStashData(url): Observable<any> {
    // url = url.toLowerCase();
    console.log("Fetching Data");
    // httpProvider.defaults.useXDomain = true;
    let getfromNinja = this.http.get<any>(url).pipe(map(result => result));
    console.log("Inside");
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
}
