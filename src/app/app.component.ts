import { Component, OnInit } from '@angular/core';
import { ConfigService } from './service/pokemon.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { FormsModule } from '@angular/forms';
import {Pokemon} from './item/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PokemonApp';
  searchTerm: string;
  griddedPokemonList$!: Observable<Pokemon> [];

  constructor(private pokemonService: ConfigService) {
    this.searchTerm = '';
  }

  ngOnInit() {
    this.griddedPokemonList$ = this.pokemonService.getPokemonList();
    //this.pokemonService.getData();
  }

  getPokemonByName() {
    this.pokemonService.getPokemonByName(this.searchTerm);
  }
}

