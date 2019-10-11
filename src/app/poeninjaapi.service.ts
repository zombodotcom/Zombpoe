import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PoeninjaapiService {
  baseURL = "https://poe.ninja/api/data/{}Overview?league={}&type={}";
  ninjaCurrencyTypes = ["Fragment", "Currency"];
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
  private url = "https://super-crud.herokuapp.com/pokemon";
  getPoeNinjaData(): Observable<any> {
    console.log("Fetching Data");
    return this.http.get<any>(this.url);
  }
}
