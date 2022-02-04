import { APP_ID, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, VirtualTimeScheduler } from 'rxjs';
import {map} from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { APIResource, BerryClient, NamedAPIResource } from 'pokenode-ts';
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../item/pokemon';
import {of} from 'rxjs';
import { url } from 'inspector';

@Injectable({
    providedIn: 'any' // fixes NullInjectorError
  })

export class ConfigService {
    searchTerm: string;
    constructor(private http: HttpClient) {
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
        
        console.log(pokemon);
        return of(pokemon);
    }

    // LATER VERSION

    /*getPokemonByName(searchTerm: string): any {
        var pokemon: Pokemon = {};
        pokemon.name = searchTerm;
        (async () => {
            console.log("in async in service")
            try {
                const api = new PokemonClient();
                const result = await api
                .getPokemonByName(searchTerm)
                
                /*.then((data) => {
                    this.getHP(searchTerm).then(result => {
                        pokemon.hp = result;
                        console.log(pokemon.hp + " <-- hp in service byname")
                    })
                    this.getPokemonImage(searchTerm).then(result => {
                        pokemon.imageURL = result
                        console.log(pokemon.imageURL + " <-- url in service byname");
                    })
                    return of(pokemon);
                })
                

                await this.getHP(searchTerm).then(data => {
                    pokemon.hp = data;
                    console.log(pokemon.hp)
                })
                await this.getPokemonImage(searchTerm).then(data => {
                    pokemon.imageURL = data;
                    console.log(pokemon.hp)
                })
                //pokemon = Object.assign(new Pokemon, result)
                
                //pokemon.hp = result.stats[0].base_stat;
                console.log(pokemon.hp + " <-- getpokemonbyname in service")
                
                //pokemon.imageURL = result.sprites.other['official-artwork'].front_default as string;
                
                console.log(pokemon.imageURL + " <-- getpokemonbyname in service")
                //return of(pokemon);
            }catch(err) {
                console.log("in error")
                console.error(err);
                return err;
            }
            
        });
        console.log(pokemon.name + " <--- pokemon in service")
        console.log(pokemon.hp + " <--- pokemon in service")
        console.log(pokemon.imageURL+ " <--- pokemon in service")
        return of(pokemon);

            /*.then((data) => {
                this.getHP(searchTerm).then(result => {
                    pokemon.hp = result;
                })
                this.getPokemonImage(searchTerm).then(result => {
                    pokemon.imageURL = result
                })
                const pokemonObject = Object.assign(new Pokemon, data)
                pokemon = pokemonObject;
                console.log(pokemon)
                return of(pokemon);
            })
            .catch((error) => console.log(error));
        })();
        return of(pokemon);
        
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
            //console.log(hp);
            return hp;
        })
        .catch((error) => console.error(error));
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
        .catch((error) => console.error(error));
        return image;
    }
}
