import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { APIResource, BerryClient, NamedAPIResource } from 'pokenode-ts';
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../item/pokemon';

@Injectable({
    providedIn: 'root' // fixes NullInjectorError
  })
export class ConfigService {
    pokeSource = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    constructor(private http: HttpClient) {

        const api = new BerryClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } }); // Enable cache with 5 seconds including requests with query parameters.

        // First call will cache the response
        // The next calls within 5 seconds will come from the cache
    }

    /*getPokemonList(): any {
        (async () => {
            const api = new PokemonClient();
            var amountOfPokemons = 898; // amount of pokemon without counting variations
            var amountWanted = 20;
            var griddedPokemons: Pokemon[] = [];

            await api
            .listPokemons(0, amountOfPokemons)
            .then((data) => {
                var indexArray = new Array();
                for (var i = 1; i <= amountWanted; i++) {
                    var randomPokemonIndex = Math.floor(Math.random() * amountOfPokemons);
                    if (indexArray.includes(randomPokemonIndex)) { // if index is already in array, it is not added and random is made again
                        console.log(randomPokemonIndex)
                        i--;
                        continue;  
                    } else { // if index is not in array, it is used to push data result to griddedPokemons
                        indexArray.push(randomPokemonIndex);
                        //var data.results[randomPokemonIndex] = new Pokemon();
                        const pokemon = Object.assign(new Pokemon, data.results[randomPokemonIndex]);
                        console.log(pokemon);
                        griddedPokemons.push(pokemon);
                        //griddedPokemons.push(data.results[randomPokemonIndex]);
                    }
                }
            })
            .catch((error) => console.error(error));
            //console.log(JSON.stringify(griddedPokemons));  
            console.log(griddedPokemons)
            return griddedPokemons;
  
        })();
    }*/

    /*
    getData() {
        fetch(this.pokeSource)
        .then(response => response.json())
        .then(allpokemon => 
            console.log(allpokemon + ' = from fetch'))
        }
*/
    getPokemonList(): any {
        (async () => {
            const api = new PokemonClient();
            var amountOfPokemons = 898; // amount of pokemon without counting variations
            var amountWanted = 20;
            var griddedPokemons: Pokemon[] = [];

            await api
            .listPokemons(0, amountOfPokemons)
            .then((data) => {
                var indexArray = new Array();
                for (var i = 1; i <= amountWanted; i++) {
                    var randomPokemonIndex = Math.floor(Math.random() * amountOfPokemons);
                    if (indexArray.includes(randomPokemonIndex)) { // if index is already in array, it is not added and random is made again
                        console.log(randomPokemonIndex)
                        i--;
                        continue;  
                    } else { // if index is not in array, it is used to push data result to griddedPokemons
                        indexArray.push(randomPokemonIndex);
                        const pokemon = Object.assign(new Pokemon, data.results[randomPokemonIndex]);
                        console.log(pokemon);
                        griddedPokemons.push(pokemon);
                        //griddedPokemons.push(data.results[randomPokemonIndex]);
                    }
                }
            })
            .catch((error) => console.error(error));
            //console.log(JSON.stringify(griddedPokemons));  
            console.log(griddedPokemons)
            return griddedPokemons;
  
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