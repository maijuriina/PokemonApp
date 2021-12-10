import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { APIResource, BerryClient, NamedAPIResource } from 'pokenode-ts';
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../item/pokemon';

@Injectable({
    providedIn: 'root' // fixes NullInjectorError
  })
export class ConfigService {
    constructor(private http: HttpClient) {

        const api = new BerryClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } }); // Enable cache with 5 seconds including requests with query parameters.

        // First call will cache the response
        // The next calls within 5 seconds will come from the cache
    }

    getPokemonList()/*: Array<Pokemon>*/ {
        (async () => {
            const api = new PokemonClient();
            var amountOfPokemons = 898; // amount of pokemon without counting variations
            var amountWanted = 20;
            var previousPokemons: (NamedAPIResource | APIResource)[] = [];

            await api
            .listPokemons(0, amountOfPokemons)
            .then((data) => {
                for (var i = 0; i <= amountWanted; i++) {

                   // hae randomilla arvolla seuraavaksi.
                    previousPokemons.push(data.results[i]);

                    //console.log(previousPokemons.values);
                }
            }
            )

            //.then((data) => console.log(data.results))
            .catch((error) => console.error(error));
            console.log(JSON.stringify(previousPokemons));
            

        })();
    }

    getPokemonByName(searchTerm: string): void {
        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(searchTerm)
                .then((data) => console.log(data.name)) // will output name in searchTerm
                .catch((error) => console.error(error));
        })();
    }
}