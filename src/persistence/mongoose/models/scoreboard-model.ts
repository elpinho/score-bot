import { Document, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IScoreboard } from '../../../models/scoreboard';

const ScoreboardSchema: Schema = new Schema<IScoreboard>(
  {
    name: { type: String, required: true, unique: true, validate: /[^\s]+/ },

    winsLabel: { type: String, default: 'Wins' },
    lossesLabel: { type: String, default: 'Losses' },
    wlrLabel: { type: String, default: 'WLR' },
    winRateLabel: { type: String, default: 'Win Rate' },

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

export const scoreboardModel = mongoose.model<IScoreboard & Document>('Board', ScoreboardSchema);
