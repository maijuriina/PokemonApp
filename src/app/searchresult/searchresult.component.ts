import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  constructor(private router: Router) {
   }

  ngOnInit(): void {
  }

  onNavigateClick(urlToNavigate: any) {
    this.router.navigateByUrl('/' + urlToNavigate);
  }

}
