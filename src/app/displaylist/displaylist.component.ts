import { Component, OnInit } from "@angular/core";
import { PoeninjaapiService } from "../poeninjaapi.service";

@Component({
  selector: "app-displaylist",
  templateUrl: "./displaylist.component.html",
  styleUrls: ["./displaylist.component.scss"]
})
export class DisplaylistComponent implements OnInit {
  private poeninjaData: any;
  constructor(private svc: PoeninjaapiService) {}

  ngOnInit() {
    this.svc.getPoeNinjaData().subscribe(data => {
      this.poeninjaData = data;
    });
  }
}
