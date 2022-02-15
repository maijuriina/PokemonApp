import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable, from } from 'rxjs';
import { ConfigService } from '../service/pokemon.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  pokemon$!: Observable<any>;
  pokeName: any;

  constructor(private router: Router, private pokemonService: ConfigService) {
   }

  ngOnInit(): void {
    this.pokeName = this.pokemonService.searchTerm;
    this.pokemon$ = from(this.pokemonService.getPokemonByName(this.pokeName));
    console.log(this.pokemon$ + " <-- this.pokemon$ in searchresult ngoninit");
  }

  onNavigateClick(urlToNavigate: any) {
    this.router.navigateByUrl('/' + urlToNavigate);
  }

}
