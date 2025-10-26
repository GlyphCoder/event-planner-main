import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Generate an AI storybook using Gemini
 * @param {Array} images - Array of image URLs or base64 strings
 * @param {Object} eventDetails - Event details (name, date, description)
 * @param {string} tone - Story tone (romantic, professional, fun, nostalgic)
 * @returns {Promise<string>} Generated story text
 */
export const generateStorybook = async (images, eventDetails, tone = 'romantic') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    const { eventName, date, description, anecdotes } = eventDetails;
    
    // Create the prompt for storybook generation
    const prompt = `Create a beautiful ${tone} storybook narrative for an event called "${eventName}" on ${date}.

${description ? `Event details: ${description}` : ''}

${anecdotes ? `Special moments and anecdotes: ${anecdotes}` : ''}

Please write a heartwarming ${tone} story in 3-5 paragraphs that:
1. Has an engaging beginning that sets the scene
2. Describes the special moments and emotions
3. Has a memorable conclusion

Write it in a narrative style suitable for a storybook.`;

    // For image analysis (when images are provided)
    let result;
    if (images && images.length > 0) {
      const imageParts = images.map(img => ({
        inlineData: {
          data: img.includes('base64') ? img.split(',')[1] : img,
          mimeType: 'image/jpeg'
        }
      }));
      
      result = await model.generateContent([prompt, ...imageParts]);
    } else {
      // Use text-only model
      const textModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
      result = await textModel.generateContent(prompt);
    }

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating storybook:', error);
    throw new Error('Failed to generate storybook with AI');
  }
};

/**
 * Generate social media post caption and hashtags
 * @param {Object} postDetails - Post details (event name, images, tone)
 * @returns {Promise<Object>} { caption, hashtags }
 */
export const generateSocialMediaContent = async (postDetails) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const { eventName, description, tone = 'fun' } = postDetails;
    
    const prompt = `Generate a compelling ${tone} social media post for an event called "${eventName}".

Description: ${description}

Requirements:
1. Write an engaging caption (2-3 sentences)
2. Generate 10-15 relevant hashtags
3. Make it engaging and shareable

Return the response as JSON in this format:
{
  "caption": "...",
  "hashtags": ["#hashtag1", "#hashtag2", ...]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to extract JSON from the response
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if JSON parsing fails
    return {
      caption: text,
      hashtags: []
    };
  } catch (error) {
    console.error('Error generating social media content:', error);
    throw new Error('Failed to generate social media content');
  }
};

/**
 * Generate AI recommendations for vendors based on event details and budget
 * @param {Object} criteria - Budget, location, event type, preferences
 * @returns {Promise<Array>} Recommended vendor suggestions
 */
export const generateVendorRecommendations = async (criteria) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const { budget, location, eventType, preferences } = criteria;
    
    const prompt = `Based on the following criteria, provide vendor recommendations:
- Budget: ₹${budget}
- Location: ${location}
- Event Type: ${eventType}
- Preferences: ${preferences || 'none'}

Analyze and suggest:
1. Which vendors are essential for this event type
2. Budget allocation suggestions across different vendor categories
3. Tips for finding the best value vendors

Return as a structured recommendation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating vendor recommendations:', error);
    throw new Error('Failed to generate vendor recommendations');
  }
};

/**
 * Generate event timeline and reminders
 * @param {Object} eventDetails - Event details (date, type, venue)
 * @returns {Promise<Object>} Timeline with milestones and reminders
 */
export const generateEventTimeline = async (eventDetails) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const { eventType, eventDate, venue } = eventDetails;
    
    const prompt = `Generate a comprehensive event planning timeline for a ${eventType} event on ${eventDate}.

Create a milestone-based timeline with:
1. Key dates and deadlines leading up to the event
2. Important milestones (vendor booking, invitation sending, etc.)
3. Reminders for critical tasks

Return as a structured timeline with dates and tasks.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating event timeline:', error);
    throw new Error('Failed to generate event timeline');
  }
};

