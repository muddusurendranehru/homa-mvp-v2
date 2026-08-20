import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com';
  const now = new Date();
  
  return [
    // Core pages
    { url: `${baseUrl}/`, lastModified: now, priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/enroll`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/remission-program`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/assessment`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/conditions`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/dashboard`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/auth`, lastModified: now, priority: 0.6 },
    { url: `${baseUrl}/diet`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/nutri-bot`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/tools`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/testimonials`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, priority: 0.5 },
    { url: `${baseUrl}/upgrade`, lastModified: now, priority: 0.6 },
    { url: `${baseUrl}/onboarding-emails`, lastModified: now, priority: 0.5 },
    
    // Location pages
    { url: `${baseUrl}/hyderabad/hyderabad`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/hyderabad/gachibowli`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/hyderabad/ameerpet`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/hyderabad/patancheru`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/hyderabad/bachupally`, lastModified: now, priority: 0.8 },
    
    // Blog posts
    { url: `${baseUrl}/blog/can-prediabetes-be-reversed-in-90-days`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/blog/insulin-resistance-kidney-link`, lastModified: now, priority: 0.7 },
    // Add future blogs here
    
    // Condition pages
    { url: `${baseUrl}/conditions/diabetes`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/hypertension`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/pcos`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/kidney-disease`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/obesity`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/prediabetes`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/metabolic-syndrome`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    
    // New condition pages - Patient-focused questions
    { url: `${baseUrl}/conditions/pcos-unexplained-weight-gain`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/tired-at-60-not-just-aging`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/belly-fat-wont-go-away`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/sugar-normal-high-risk`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/diabetes-swelling-in-legs`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/family-heart-attack-diabetes`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/high-bp-diabetes-treatment`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/retired-always-tired`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/family-metabolic-screening`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/conditions/always-exhausted-even-after-sleep`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
  ];
}
