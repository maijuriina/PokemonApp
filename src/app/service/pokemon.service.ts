import { APP_ID, Injectable } from '@angular/core';
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
        // solution pokenode-ts by Gabb-c (github: https://github.com/Gabb-c/pokenode-ts)
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
            // this .then() receives undefined from getHP probably due to order of execution
            .then((result) => {
                result.forEach(element => {
                    element.forEach(pokemon => {
                        console.log(pokemon.name)
                        //this.getPokemonByName(pokemon.name as string)
                        this.getHP(pokemon.name as string).then(data => {
                            console.log(data + " = DATA")
                            pokemon.hp = data;
                        })
                        console.log(pokemon.hp)                       
                    });
                    //return of(griddedPokemons);                    
                });
                return of(griddedPokemons);
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
        // these griddedPokemons have an undefined HP
        return of(griddedPokemons);
    }

    // EARLIER VERSION
    /*getPokemonList(): any {
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
            // this .then() receives undefined from getHP probably due to order of execution
            .then((result) => {
                result.forEach(element => {
                    element.forEach(pokemon => {
                        console.log(pokemon.name)
                        //this.getPokemonByName(pokemon.name as string)
                        var hp: any = this.getHP(pokemon.name as string)
                        pokemon.hp = hp;
                        console.log(pokemon.hp)                       
                    });
                    //return of(griddedPokemons);                    
                });
                return of(griddedPokemons);
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
            })
            .catch((error) => console.error(error));
        })();
        // these griddedPokemons have an undefined HP
        return of(griddedPokemons);
    }*/

    // returns individual Pokemon by name provided by user in search field
    // EARLIER VERSION
    /*getPokemonByName(searchTerm: string): any {
        var pokemon: Pokemon = {};
        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(searchTerm)
                .then((data) => {
                    const pokemonObject = Object.assign(new Pokemon, data)
                    pokemon = pokemonObject;
                    console.log(pokemon) // will output name from api
                }) 
                .catch((error) => console.error(error));
        })();
        //console.log(pokemon) // here pokemon returns empty, as it does in getHP
        return of(pokemon);
    }*/

    // LATER VERSION

    async getPokemonByName(searchTerm: string) {
        var pokemon: any;
        const api = new PokemonClient();
        pokemon = await api
        .getPokemonByName(searchTerm)
        .then((data) => {
            const pokemonObject = Object.assign(new Pokemon, data)
            pokemon = pokemonObject;
            console.log(pokemon)
        })
        .catch((error) => console.log(error));
        
        /*(async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(searchTerm)
                .then((data) => {
                    const pokemonObject = Object.assign(new Pokemon, data)
                    pokemon = pokemonObject;
                    console.log(pokemon) // will output name from api
                }) 
                .catch((error) => console.error(error));
        })();
        //console.log(pokemon) // here pokemon returns empty, as it does in getHP
        return of(pokemon);*/
    }

    // EARLIER VERSION
    /*getHP(name: string): any {
        var hp: number = 0;
        (async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(name)
                .then((data) => {
                    var hpVal = data.stats[0].base_stat // fetch HP of pokemon
                    hp = hpVal;
                    console.log(hp + " <-- HP from getHP()") // correct HP is gotten here
                    //return hp;
                })
                .catch((error) => console.error(error));
                //return hp;
        })();
        //console.log(hp); // here HP is 0 which was set on line 99, not updating has to do with not waiting
        return hp;
    }*/

    // NEW VERSION
    async getHP(name: string) : Promise<any> {
        const api = new PokemonClient();
        var hp: any;
        hp = await api
        .getPokemonByName(name)
        .then((data) => {
            var hpVal = data.stats[0].base_stat // fetches HP of pokemon
            hp = hpVal;
            console.log(hp);
            return hp;
        })
        .catch((error) => console.error(error));
        return hp;

        /*(async () => {
            const api = new PokemonClient();

            await api
                .getPokemonByName(name)
                .then((data) => {
                    var hpVal = data.stats[0].base_stat // fetch HP of pokemon
                    hp = hpVal;
                    console.log(hp + " <-- HP from getHP()") // correct HP is gotten here
                    //return hp;
                })
                .catch((error) => console.error(error));
                //return hp;
        })();
        //console.log(hp); // here HP is 0 which was set on line 99, not updating has to do with not waiting
        return hp;*/
    }
}
