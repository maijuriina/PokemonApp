import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/pokemon.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Pokemon} from '../../item/pokemon';
import { NamedAPIResourceList } from 'pokenode-ts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm: string;
  griddedPokemons$!: Observable<any>;

  constructor(private pokemonService: ConfigService, public router: Router) {
    this.searchTerm = '';
   }

  ngOnInit(): void {
    this.griddedPokemons$ = this.pokemonService.getPokemonList();
  }

  getPokemonByName() {
    var LCsearchTerm = this.searchTerm.toLowerCase();
    this.pokemonService.getPokemonByName(LCsearchTerm);
  }

  onNavigateClick(urlToNavigate: any) {
    this.router.navigateByUrl('/' + urlToNavigate);
  }
}
