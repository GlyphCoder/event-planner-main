import mongoose from 'mongoose';

const storybookSchema = new mongoose.Schema({
  storybookId: { type: String, required: true, unique: true },
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  bookLink: String,
  title: String,
  subtitle: String,
  images: [String], // Array of image URLs
  story: String, // AI-generated story text
  tone: { type: String, enum: ['romantic', 'professional', 'fun', 'nostalgic'], default: 'romantic' },
  eventName: String,
  generatedAt: { type: Date, default: Date.now },
  metadata: Object,
}, { timestamps: true });

export default mongoose.model('Storybook', storybookSchema);
