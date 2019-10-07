import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FABI-Web';

  constructor(private cookieService: CookieService){
  }

  public ngOnInit(): void {
    this.cookieService.set('SameSite', 'None');
  }
}


