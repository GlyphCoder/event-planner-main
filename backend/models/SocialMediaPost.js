import mongoose from 'mongoose';

const socialMediaPostSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true },
  caption: String,
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  postImageUrl: String,
  instaHandle: String,
  hashtags: [String],
  platforms: [{ type: String }], // instagram, facebook, tiktok
  scheduledAt: Date,
  publishedAt: Date,
  status: { type: String, enum: ['draft', 'scheduled', 'published', 'failed'], default: 'draft' },
  engagement: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model('SocialMediaPost', socialMediaPostSchema);
