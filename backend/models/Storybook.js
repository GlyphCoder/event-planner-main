import mongoose from 'mongoose';

const storybookSchema = new mongoose.Schema({
  storybookId: String,
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  bookLink: String,
}, { timestamps: true });

export default mongoose.model('Storybook', storybookSchema);
