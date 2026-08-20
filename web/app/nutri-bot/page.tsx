'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

// Mock nutrition database (expand as needed)
const nutritionData: Record<string, { calories: number; protein: number; carbs: number; fat: number; fiber: number }> = {
  'tomato curry': { calories: 85, protein: 2, carbs: 12, fat: 3, fiber: 2 },
  'dal': { calories: 150, protein: 9, carbs: 20, fat: 4, fiber: 5 },
  'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
  'chapati': { calories: 104, protein: 3.1, carbs: 18, fat: 2.5, fiber: 2 },
  'roti': { calories: 104, protein: 3.1, carbs: 18, fat: 2.5, fiber: 2 },
  'idli': { calories: 39, protein: 2, carbs: 8, fat: 0.1, fiber: 0.4 },
  'dosa': { calories: 133, protein: 4, carbs: 22, fat: 3, fiber: 1 },
  'sambar': { calories: 65, protein: 3, carbs: 10, fat: 2, fiber: 3 },
  'upma': { calories: 170, protein: 4, carbs: 28, fat: 5, fiber: 2 },
  'poha': { calories: 158, protein: 3, carbs: 32, fat: 2, fiber: 1 },
  'biryani': { calories: 290, protein: 12, carbs: 40, fat: 10, fiber: 1 },
  'chicken curry': { calories: 243, protein: 25, carbs: 8, fat: 12, fiber: 1 },
  'fish curry': { calories: 180, protein: 22, carbs: 6, fat: 8, fiber: 1 },
  'paneer': { calories: 265, protein: 18, carbs: 4, fat: 20, fiber: 0 },
  'palak paneer': { calories: 220, protein: 12, carbs: 8, fat: 16, fiber: 2 },
  'chole': { calories: 180, protein: 9, carbs: 24, fat: 6, fiber: 7 },
  'rajma': { calories: 165, protein: 8, carbs: 25, fat: 4, fiber: 6 },
  'pizza': { calories: 266, protein: 11, carbs: 33, fat: 10, fiber: 2 },
  'burger': { calories: 295, protein: 17, carbs: 24, fat: 14, fiber: 1 },
  'samosa': { calories: 262, protein: 4, carbs: 24, fat: 17, fiber: 2 },
  'vada pav': { calories: 290, protein: 6, carbs: 40, fat: 12, fiber: 2 },
  'pav bhaji': { calories: 320, protein: 8, carbs: 42, fat: 14, fiber: 4 },
  'egg': { calories: 78, protein: 6, carbs: 0.6, fat: 5, fiber: 0 },
  'omelette': { calories: 154, protein: 11, carbs: 1, fat: 12, fiber: 0 },
  'milk': { calories: 42, protein: 3.4, carbs: 5, fat: 1, fiber: 0 },
  'curd': { calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0 },
  'lassi': { calories: 150, protein: 5, carbs: 20, fat: 5, fiber: 0 },
  'tea': { calories: 30, protein: 0.5, carbs: 6, fat: 0.5, fiber: 0 },
  'coffee': { calories: 35, protein: 1, carbs: 5, fat: 1, fiber: 0 },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
  'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
  'mango': { calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6 },
  'papaya': { calories: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7 },
  'orange': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4 },
  'gulab jamun': { calories: 175, protein: 2, carbs: 28, fat: 6, fiber: 0 },
  'jalebi': { calories: 150, protein: 1, carbs: 30, fat: 5, fiber: 0 },
  'kheer': { calories: 120, protein: 4, carbs: 18, fat: 4, fiber: 0 },
};

function findNutrition(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  for (const [food, nutrition] of Object.entries(nutritionData)) {
    if (lowerQuery.includes(food)) {
      return `🍽️ **${food.charAt(0).toUpperCase() + food.slice(1)}** (per serving)

📊 **Nutrition Facts:**
• Calories: ${nutrition.calories} kcal
• Protein: ${nutrition.protein}g
• Carbs: ${nutrition.carbs}g
• Fat: ${nutrition.fat}g
• Fiber: ${nutrition.fiber}g

💡 **HOMA-IR Tip:** ${getNutritionTip(nutrition)}`;
    }
  }
  
  return `🔍 I couldn't find "${query}" in my database.

Try asking about common Indian foods like:
• Dal, Rice, Chapati, Roti
• Idli, Dosa, Sambar, Upma
• Biryani, Chicken Curry, Paneer
• Fruits: Banana, Apple, Mango

Or ask: "calories in [food name]"`;
}

function getNutritionTip(nutrition: { calories: number; carbs: number; fiber: number }): string {
  if (nutrition.calories > 250) {
    return "High calorie food - consume in moderation for metabolic health.";
  }
  if (nutrition.carbs > 25 && nutrition.fiber < 3) {
    return "High carb, low fiber - may spike blood sugar. Pair with protein or fiber-rich foods.";
  }
  if (nutrition.fiber >= 3) {
    return "Good fiber content helps stabilize blood sugar and improve insulin sensitivity.";
  }
  return "Balanced option for your metabolic health journey.";
}

export default function NutriBotPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(10);
  const [isFreeTier, setIsFreeTier] = useState(true);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check authentication and load tokens from API
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/auth');
      return;
    }
    
    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
      
      // Fetch tokens from API (database)
      fetchTokensFromAPI(token);
      
      // Load chat history from localStorage (messages only)
      const savedMessages = localStorage.getItem('nutribot_messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([{
          id: 'welcome',
          type: 'bot',
          text: `👋 Welcome to NutriBot, ${userData.name || 'Patient'}!

I'm your AI nutrition assistant. Ask me about calories, protein, carbs, and more for any food!

**Examples:**
• "Calories in dosa"
• "Nutrition info for biryani"
• "How many calories in samosa?"

You have **10 free queries**. Each question uses 1 token.

Let's get started! 🥗`,
          timestamp: new Date()
        }]);
      }
    } catch (e) {
      router.push('/auth');
    }
    
    setLoading(false);
  }, [router]);

  // Fetch tokens from database via API
  const fetchTokensFromAPI = async (authToken: string) => {
    try {
      const res = await axios.get(`${API_URL}/api/nutribot/tokens`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setTokens(res.data.tokens_remaining);
      setIsFreeTier(res.data.is_free_tier);
    } catch (error) {
      console.error('Error fetching tokens:', error);
      // Fallback to localStorage if API fails
      const savedTokens = localStorage.getItem('nutribot_tokens');
      setTokens(savedTokens ? parseInt(savedTokens) : 10);
    }
  };

  // Use token via API
  const consumeTokenFromAPI = async (): Promise<boolean> => {
    const authToken = localStorage.getItem('token');
    if (!authToken) return false;

    try {
      const res = await axios.post(
        `${API_URL}/api/nutribot/use-token`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setTokens(res.data.tokens_remaining);
      return true;
    } catch (error: any) {
      if (error.response?.status === 403) {
        setTokens(0);
        return false;
      }
      console.error('Error using token:', error);
      // Fallback: use localStorage
      const currentTokens = tokens - 1;
      setTokens(currentTokens);
      localStorage.setItem('nutribot_tokens', currentTokens.toString());
      return currentTokens >= 0;
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save messages to localStorage
  useEffect(() => {
    if (!loading && messages.length > 0) {
      localStorage.setItem('nutribot_messages', JSON.stringify(messages));
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || tokens <= 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsTyping(true);

    // Use token from API/database
    const tokenUsed = await consumeTokenFromAPI();

    // Simulate API delay
    setTimeout(() => {
      let response: string;
      
      if (!tokenUsed && tokens <= 0) {
        response = `⚠️ **No tokens remaining!**

You've used all your free queries. To continue using NutriBot:

💳 **Recharge for ₹500** → Get 100 more queries!

Click the "Recharge Now" button below.`;
      } else {
        response = findNutrition(query);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleRecharge = () => {
    router.push('/enroll?plan=tokens');
  };

  const clearChat = () => {
    const welcomeMsg: Message = {
      id: 'welcome-new',
      type: 'bot',
      text: `💬 Chat cleared! You have **${tokens} tokens** remaining.

Ask me about any food!`,
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
    localStorage.setItem('nutribot_messages', JSON.stringify([welcomeMsg]));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading NutriBot...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-green-600 hover:text-green-700 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium hidden sm:inline">Back to HOMA Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              🤖 NutriBot
            </h1>
          </div>
          
          {/* Token Counter */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
            tokens > 5 ? 'bg-green-100 text-green-700' : 
            tokens > 2 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-red-100 text-red-700'
          }`}>
            <span>🪙</span>
            <span className="font-bold">{tokens}</span>
            <span className="hidden sm:inline text-xs">tokens</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-teal-600 text-white rounded-br-md'
                    : 'bg-white shadow-md rounded-bl-md'
                }`}
              >
                {msg.type === 'bot' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                    <span className="text-lg">🤖</span>
                    <span className="text-xs text-gray-500 font-medium">NutriBot</span>
                  </div>
                )}
                <div className={`text-sm whitespace-pre-wrap ${msg.type === 'user' ? '' : 'text-gray-700'}`}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('•') ? 'ml-2' : ''}>
                      {line.includes('**') 
                        ? line.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                          )
                        : line
                      }
                    </p>
                  ))}
                </div>
                <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-teal-100' : 'text-gray-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow-md rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Out of Tokens Banner */}
      {tokens <= 0 && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-bold text-lg mb-2">🪙 You've used all your free tokens!</p>
            <p className="text-sm mb-3 text-red-100">Recharge to continue asking nutrition questions</p>
            <button
              onClick={handleRecharge}
              className="bg-white text-red-600 font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              💳 Recharge ₹500 for Unlimited Access
            </button>
          </div>
        </div>
      )}

      {/* Low Tokens Warning */}
      {tokens > 0 && tokens <= 3 && (
        <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="text-yellow-700 text-sm">
              ⚠️ Only <strong>{tokens} tokens</strong> remaining!
            </p>
            <button
              onClick={handleRecharge}
              className="text-yellow-700 font-medium text-sm underline hover:text-yellow-800"
            >
              Recharge Now
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <button
              type="button"
              onClick={clearChat}
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Clear chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tokens > 0 ? "Ask about any food... (e.g., calories in dosa)" : "Please recharge to continue..."}
              disabled={tokens <= 0 || isTyping}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            
            <button
              type="submit"
              disabled={!query.trim() || tokens <= 0 || isTyping}
              className="px-6 py-3 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="hidden sm:inline">Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          
          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-gray-400">Quick:</span>
            {['Dosa', 'Dal', 'Rice', 'Biryani', 'Samosa'].map((food) => (
              <button
                key={food}
                onClick={() => setQuery(`Calories in ${food.toLowerCase()}`)}
                disabled={tokens <= 0}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors disabled:opacity-50"
              >
                {food}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
