# PokemonApp

The project can be viewed on: https://pokemon-app-279e1.web.app/home  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

# Description

The app fetches 20 unique, random Pokemons (name, HP and image) on launch using the PokeApi (https://pokeapi.co/). Pokemons can be searched directly by entering a Pokemon name on the search field.  
The app uses an accordion element to display more info on a Pokemon when clicked, and hides it when clicked again. The app is responsive to screen size.  
Each fetched Pokemon also has a "see more" page, where the Pokemon is displayed individually. Currently there is no "more" information than what is displayed in the preliminary search. When the user returns to the home page, the app fetches 20 new Pokemons from the API.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
