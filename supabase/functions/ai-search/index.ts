
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const openAIApiKey = Deno.env.get('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');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchQuery, cards } = await req.json();

    console.log('AI Search request:', { searchQuery, cardsCount: cards.length });

    const prompt = `
You are a credit card recommendation expert. Given a user's search query and a list of credit cards, return the most relevant cards that match their needs.

User Query: "${searchQuery}"

Available Cards:
${cards.map((card: any, index: number) => `
${index + 1}. ${card.name} (${card.issuer})
   - Annual Fee: ₹${card.annual_fee}
   - Rewards: ${card.rewards}
   - Features: ${card.features.join(', ')}
   - Categories: ${card.category.join(', ')}
   - Rating: ${card.rating}
`).join('')}

Please analyze the query and return a JSON response with:
1. "relevantCards" - array of card indices (0-based) that best match the query, ordered by relevance
2. "explanation" - brief explanation of why these cards were selected
3. "searchTerms" - array of key terms extracted from the query

Consider factors like:
- Spending categories mentioned (dining, travel, fuel, shopping, etc.)
- Fee preferences (no annual fee, low fee, etc.)
- Reward types (cashback, points, miles, etc.)
- Bank preferences
- Card tier (premium, basic, etc.)
- Specific features requested

Return only valid JSON without any markdown formatting.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful credit card recommendation expert. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response:', aiResponse);
    
    // Parse the AI response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to simple text search
      const lowerQuery = searchQuery.toLowerCase();
      const relevantCards = cards
        .map((card: any, index: number) => ({ card, index }))
        .filter(({ card }: any) => 
          card.name.toLowerCase().includes(lowerQuery) ||
          card.issuer.toLowerCase().includes(lowerQuery) ||
          card.features.some((feature: string) => feature.toLowerCase().includes(lowerQuery)) ||
          card.category.some((cat: string) => cat.toLowerCase().includes(lowerQuery))
        )
        .map(({ index }: any) => index);
      
      parsedResponse = {
        relevantCards: relevantCards.slice(0, 6),
        explanation: "Search results based on text matching",
        searchTerms: [searchQuery]
      };
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-search function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      relevantCards: [],
      explanation: "An error occurred during search",
      searchTerms: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
