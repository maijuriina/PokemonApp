import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/pokemon.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Pokemon} from '../../item/pokemon';
import { NamedAPIResourceList } from 'pokenode-ts';
import { SearchresultComponent } from 'src/app/searchresult/searchresult.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm: string;
  griddedPokemons$!: Observable<any>;
  breakpoint: number = 0;

  constructor(private pokemonService: ConfigService, public router: Router) {
    this.searchTerm = '';
   }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 3;
    this.griddedPokemons$ = this.pokemonService.getPokemonList();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 3;
  }

  getPokemonByName() {
    var LCsearchTerm = this.searchTerm.toLowerCase();
    this.pokemonService.getPokemonByName(LCsearchTerm);
  }

  onNavigateClick(urlToNavigate: any, name: any) {
    this.pokemonService.searchTerm = name;
    this.router.navigateByUrl('/' + urlToNavigate);
  }
}
