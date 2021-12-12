import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { APIResource, BerryClient, NamedAPIResource } from 'pokenode-ts';
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../item/pokemon';
import {of} from 'rxjs';
import { ConditionalExpr, HtmlParser } from '@angular/compiler';

@Injectable({
    providedIn: 'root' // fixes NullInjectorError
  })
export class ConfigService {

    constructor(private http: HttpClient) {

        const api = new BerryClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } }); // Enable cache with 5 seconds including requests with query parameters.

        // First call will cache the response
        // The next calls within 5 seconds will come from the cache
    }

    getPokemonList(): any {
        var griddedPokemons: Pokemon[] = [];
        (async () => {
            const api = new PokemonClient();
            var amountOfPokemons = 898; // amount of pokemon without counting variations
            var amountWanted = 20;

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
                        const pokemon = Object.assign(new Pokemon, data.results[randomPokemonIndex]); // make data into a Pokemon
                        griddedPokemons.push(pokemon); // push into Pokemon-list to be returned at the end of the api call
                    }
                }
                return of(griddedPokemons);
            })
            .then((result) => {
                result.forEach(element => {
                    element.forEach(pokemon => {
                        console.log(pokemon.name)
                        pokemon.hp = this.getHP(pokemon.name as string)
                        console.log(pokemon.hp)                       
                    });
                    //element = this.getHP(element.name as string)
                    //return of(griddedPokemons);                    
                });
            })
            /*.then((data) => {
                griddedPokemons.forEach(pokemon => {
                    var hp = this.getHP(pokemon.name as string)
                    console.log(hp);
                    //console.log(this.getHP(pokemon.name as string))
                    pokemon.hp = this.getHP(pokemon.name as string)
                    console.log(pokemon.hp)
                })
                console.log(griddedPokemons[1].hp + " <- inside getPokemonList")
            })*/
            .catch((error) => console.error(error));
        })();
        console.log(griddedPokemons);
        return of(griddedPokemons);

    }

    getPokemonByName(searchTerm: string): any {
        var pokemon: Pokemon = {};
        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(searchTerm)
                .then((data) => {
                    const pokemonObject = Object.assign(new Pokemon, data)
                    pokemon = pokemonObject;
                    //console.log(data) // will output name in searchTerm
                }) 
                .catch((error) => console.error(error));
        })();
        console.log(pokemon)
        return of(pokemon);
    }

    /*getMoreData(url: string) {
        return this.http.get(url)
    }*/

    getHP(name: string): any {
        var hp;
        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(name)
                .then((data) => {
                    var hp = data.stats[0].base_stat // fetch HP of pokemon
                    console.log(hp + " <-- hp inside then")
                    //return hp;
                })
                .catch((error) => console.error(error));
        })();
        console.log(hp);
        return hp;
    }
}
