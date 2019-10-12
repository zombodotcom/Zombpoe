import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
@Injectable()
export class UserService {
  private serviceUrl =
    "https://poe.ninja/api/data/ItemOverview?league=Blight&type=Fossil";
  derp = [];

  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl);
  }
}
