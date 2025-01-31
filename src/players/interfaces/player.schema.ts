import mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: String,
    name: String,
    ranking: String,
    rankingPosition: Number,
    photoUrl: String,
  },
  { timestamps: true, collection: 'players' },
);
