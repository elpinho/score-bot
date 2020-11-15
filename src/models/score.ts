export interface IScore {
  wins: number;
  losses: number;
}

export class Score implements IScore {
  readonly wlr: number;
  readonly winRate: number;
  readonly total: number;

  constructor(public readonly wins: number, public readonly losses: number, public name?: string) {
    this.wlr = this._calcWlr();
    this.winRate = this._calcWinRate();
    this.total = this.wins + this.losses;
  }

  private _calcWlr(): number {
    if (this.losses === 0) {
      return this.wins;
    }

    return this.wins / this.losses;
  }

  private _calcWinRate(): number {
    const total = this.wins + this.losses;
    if (total === 0) {
      return 0;
    }

    return this.wins / total;
  }

  static clone(score: IScore | any) {
    return new Score(score.wins, score.losses, score['name']);
  }
}
