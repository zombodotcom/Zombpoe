import { Component, OnInit } from "@angular/core";
import { PoeninjaapiService } from "../poeninjaapi.service";
import { DataSource } from "@angular/cdk/table";
import { Sort } from "@angular/material/sort";
import { HttpClient } from "@angular/common/http";
export interface PoeNinjaItemData {
  name: string;
  chaosValue: number;
  icon: string;
  exaltedValue: number;
}

@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.scss"]
})
export class DisplaylistComponent implements OnInit {
  sortedData: PoeNinjaItemData[];

  displayedColumns: string[] = ["name", "chaosValue", "exaltedValue", "icon"];
  private poeninjaData: any;

  constructor(private svc: PoeninjaapiService, private http: HttpClient) {}
  ngOnInit() {
    // this.http.get('/api/people/1').subscribe(character => {
    //   this.http.get(character.homeworld).subscribe(homeworld => {
    //     character.homeworld = homeworld;
    //     this.loadedCharacter = character;
    //   });
    // });
    this.http
      .get(
        "https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil"
      )
      .subscribe(json => console.log(json));
    this.svc.getPoeNinjaData().subscribe(data => {
      this.poeninjaData = data;
      this.sortedData = this.poeninjaData;
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
