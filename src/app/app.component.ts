import { Component, OnInit } from '@angular/core';
import { ConfigService } from './service/pokemon.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Pokemon} from './item/pokemon';
import { NamedAPIResourceList } from 'pokenode-ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PokemonApp';
  searchTerm: string;
  griddedPokemons$!: Observable<any>;

  constructor(private pokemonService: ConfigService, public router: Router) {
    this.searchTerm = '';
  }

  ngOnInit() {
    this.griddedPokemons$ = this.pokemonService.getPokemonList();
  }

  getPokemonByName() {
    var LCsearchTerm = this.searchTerm.toLowerCase();
    this.pokemonService.getPokemonByName(LCsearchTerm);
  }

}

