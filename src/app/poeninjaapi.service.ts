import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";

import { from } from "rxjs";

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

  private privateurl =
    "https://bypasscors.herokuapp.com/api/?url=" +
    encodeURIComponent(
      "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil"
    );
  constructor(private http: HttpClient) {}
  private url =
    "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";

  getPoeNinjaData(): Observable<any> {
    console.log("Fetching Data");
    // httpProvider.defaults.useXDomain = true;
    let getfromNinja = this.http.get<any>(this.url);
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
