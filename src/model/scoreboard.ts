import { IScore } from './score';
import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IScoreboard extends Document {
  name: string;
  scores?: Map<string, IScore>;

  winsLabel?: string;
  lossesLabel?: string;
  wlrLabel?: string;
}

const ScoreboardSchema: Schema = new Schema<IScoreboard>(
  {
    name: { type: String, required: true, unique: true, validate: /[^\s]+/ },
    winsLabel: { type: String, default: 'Wins' },
    lossesLabel: { type: String, default: 'Losses' },
    wlrLabel: { type: String, default: 'WLR' },
    scores: {
      type: Map,
      of: new Schema({
        wins: { type: Number, required: true },
        losses: { type: Number, required: true },
      }),
      default: new Map(),
    },
  },
  { timestamps: true }
);

export const scoreboardModel = mongoose.model<IScoreboard>('Board', ScoreboardSchema);
