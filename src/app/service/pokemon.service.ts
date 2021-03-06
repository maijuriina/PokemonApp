import { APP_ID, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, VirtualTimeScheduler } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { APIResource, BerryClient, NamedAPIResource } from 'pokenode-ts';
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../item/pokemon';
import {of} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'any' // fixes NullInjectorError
  })

export class ConfigService {
    searchTerm: string;
    constructor(private http: HttpClient, public router: Router) {
        // solution pokenode-ts by Gabb-c (github: https://github.com/Gabb-c/pokenode-ts)
        const api = new BerryClient({ cacheOptions: { maxAge: 5000, exclude: { query: false } } }); // Enable cache with 5 seconds including requests with query parameters.
        // First call will cache the response
        // The next calls within 5 seconds will come from the cache
        this.searchTerm = '';
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
                        console.log(randomPokemonIndex + " <-- this pokemon was sampled twice, latter was not added to fetched array")
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
                        this.getHP(pokemon.name as string).then(data => {
                            pokemon.hp = data;
                        })
                        this.getPokemonImage(pokemon.name as string).then(data => {
                            pokemon.imageURL = data;
                            //console.log(pokemon.imageURL + " <-- imagedata")
                        })              
                    });              
                });
                return of(griddedPokemons);
            })
            .catch((error) => console.error(error));
        })();

        return of(griddedPokemons);
    }

    // NEW VERSION
    async getPokemonByName(searchTerm: string) : Promise<any> {
        var pokemon: Pokemon = {};
        const [hpResult, urlResult] = await Promise.all([this.getHP(searchTerm), this.getPokemonImage(searchTerm)]);
        pokemon.name = searchTerm;
        pokemon.hp = hpResult;
        pokemon.imageURL = urlResult;
        
        //console.log(pokemon);
        return pokemon;
    }

    // NEW VERSION
    async getHP(name: string) : Promise<any> {
        const api = new PokemonClient();
        var hp: any;
        hp = await api
        .getPokemonByName(name)
        .then((data) => {
            var hpVal = data.stats[0].base_stat // fetches HP of pokemon
            hp = hpVal;
            //console.log(hp);
            return hp;
        })
        .catch((error) => {
            console.error(error);
            this.router.navigateByUrl('/' + 'home');
        });
        return hp;
    }

    async getPokemonImage(name: string) : Promise<any> {
        const api = new PokemonClient();
        var image: any;
        image = await api
        .getPokemonByName(name)
        .then((data) => {
            var spriteUrl = data.sprites.other['official-artwork'].front_default;
            image = spriteUrl;
            return image;
        })
        .catch((error) => {
            console.error(error);
            this.router.navigateByUrl('/' + 'home');
        });
        return image;
    }
}
