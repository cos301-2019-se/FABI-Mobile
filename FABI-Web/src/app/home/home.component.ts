import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hidden: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.hidden = false;
  }

  hide(){
    this.hidden = true;
    this.router.navigate(["login"]);
  }

}
