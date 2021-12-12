"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainClient = void 0;
const base_1 = require("../structures/base");
const berry_client_1 = require("./berry.client");
const contest_client_1 = require("./contest.client");
const encounter_client_1 = require("./encounter.client");
const evolution_client_1 = require("./evolution.client");
const game_client_1 = require("./game.client");
const item_client_1 = require("./item.client");
const location_client_1 = require("./location.client");
const machine_client_1 = require("./machine.client");
const move_client_1 = require("./move.client");
const pokemon_client_1 = require("./pokemon.client");
/**
 * ### Main Client
 *
 * The main client used to access all the PokéAPI Endpoints:
 *  - [Berries](https://pokeapi.co/docs/v2#berries-section)
 *  - [Contests](https://pokeapi.co/docs/v2#contests-section)
 *  - [Encounters](https://pokeapi.co/docs/v2#encounters-section)
 *  - [Evolution](https://pokeapi.co/docs/v2#evolution-section)
 *  - [Games](https://pokeapi.co/docs/v2#games-section)
 *  - [Items](https://pokeapi.co/docs/v2#items-section)
 *  - [Locations](https://pokeapi.co/docs/v2#locations-section)
 *  - [Machines](https://pokeapi.co/docs/v2#machines-section)
 *  - [Moves](https://pokeapi.co/docs/v2#moves-section)
 *  - [Pokémon](https://pokeapi.co/docs/v2#pokemon-section)
 *  - [Utility](https://pokeapi.co/docs/v2#utility-section)
 * ---
 * See [PokéAPI Documentation](https://pokeapi.co/docs/v2)
 */
class MainClient extends base_1.BaseClient {
    constructor(clientOptions) {
        super(clientOptions);
        this.berry = new berry_client_1.BerryClient(clientOptions);
        this.contest = new contest_client_1.ContestClient(clientOptions);
        this.encounter = new encounter_client_1.EncounterClient(clientOptions);
        this.evolution = new evolution_client_1.EvolutionClient(clientOptions);
        this.game = new game_client_1.GameClient(clientOptions);
        this.item = new item_client_1.ItemClient(clientOptions);
        this.location = new location_client_1.LocationClient(clientOptions);
        this.machine = new machine_client_1.MachineClient(clientOptions);
        this.move = new move_client_1.MoveClient(clientOptions);
        this.pokemon = new pokemon_client_1.PokemonClient(clientOptions);
    }
}
exports.MainClient = MainClient;
