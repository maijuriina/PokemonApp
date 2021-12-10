import { Component, OnInit } from '@angular/core';
import { ConfigService } from './service/pokemon.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PokemonApp';
  searchTerm: string;

  constructor(private pokemonService: ConfigService) {
    this.searchTerm = 'pikachu';
  }

  ngOnInit() {
    this.pokemonService.getPokemonList();

    //this.pokemonService.getPokemonByName(this.searchTerm);
  }
}

