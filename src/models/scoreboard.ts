import { IScore } from './score';

export interface IScoreboard {
  name: string;
  scores?: Map<string, IScore>;

  createdAt?: Date;
  updatedAt?: Date;

  winsLabel?: string;
  lossesLabel?: string;
  wlrLabel?: string;
  winRateLabel?: string;
}
