import { Observable } from "rxjs";

export class Pokemon {
    name?: string;
    url?: string;
    //hp: number;
    //imageURL: string;
  
    constructor(name?: string, url?: string/* hp?: number, imageURL?: string*/) {
      this.name = name;
      this.url = url;
      /*this.hp = hp ?? 0;
      this.imageURL = imageURL ?? '';*/
    }
  }