export class Pokemon {
    name: string;
    hp: number;
    imageURL: string;
  
    constructor(name: string, hp?: number, imageURL?: string) {
      this.name = name;
      this.hp = hp ?? 0;
      this.imageURL = imageURL ?? '';
    }
  }