import mongoose from 'mongoose';

const socialMediaPostSchema = new mongoose.Schema({
  postId: String,
  caption: String,
  cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  postImageUrl: String,
  instaHandle: String,
}, { timestamps: true });

export default mongoose.model('SocialMediaPost', socialMediaPostSchema);
