import { Component, OnInit } from '@angular/core';
import { ConfigService } from './service/pokemon.service';
import {Observable} from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PokemonApp';
  searchTerm: string;

  constructor(private pokemonService: ConfigService) {
    this.searchTerm = '';
  }

  ngOnInit() {
    this.pokemonService.getPokemonList();
  }

  getPokemonByName() {
    this.pokemonService.getPokemonByName(this.searchTerm);
  }
}

