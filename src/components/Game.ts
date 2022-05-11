import std from '../libs/std';

class Game {
    readonly size: number = 4;
    choices: any[];
    answer: any;
    statuses: string[];
    constructor(countries: any[], choices?: any[], answer?: any, statuses?: string[]) {
        if (choices && answer && statuses) {
            this.choices = choices;
            this.answer = answer;
            this.statuses = statuses;
        }
        else {
            this.choices = [];
            for (let i = 0; i < this.size; i++) {
                let country = countries[std.random(0, countries.length)];
                if (i == 0) {
                    this.answer = country;
                }
                this.choices.push(country);
            }
            this.choices = std.shuffle(this.choices);
            this.statuses = (new Array(this.choices.length)).fill('');
        }
    }
}

export default Game;