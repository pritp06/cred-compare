
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard } from '@/types/card';

export const useAISearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    cards: CreditCard[];
    explanation: string;
    searchTerms: string[];
  } | null>(null);

  const searchCards = async (query: string, allCards: CreditCard[]) => {
    if (!query.trim()) {
      setSearchResults(null);
      return allCards;
    }

    setIsSearching(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: {
          searchQuery: query,
          cards: allCards
        }
      });

      if (error) {
        console.error('AI search error:', error);
        // Fallback to simple text search
        const filteredCards = allCards.filter(card =>
          card.name.toLowerCase().includes(query.toLowerCase()) ||
          card.issuer.toLowerCase().includes(query.toLowerCase()) ||
          card.features.some(feature => feature.toLowerCase().includes(query.toLowerCase())) ||
          card.category.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
        );
        return filteredCards;
      }

      const { relevantCards, explanation, searchTerms } = data;
      const resultCards = relevantCards.map((index: number) => allCards[index]).filter(Boolean);
      
      setSearchResults({
        cards: resultCards,
        explanation,
        searchTerms
      });

      return resultCards;
    } catch (error) {
      console.error('Search failed:', error);
      // Fallback to simple text search
      const filteredCards = allCards.filter(card =>
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        card.issuer.toLowerCase().includes(query.toLowerCase()) ||
        card.features.some(feature => feature.toLowerCase().includes(query.toLowerCase())) ||
        card.category.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );
      return filteredCards;
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchCards,
    isSearching,
    searchResults,
    clearResults: () => setSearchResults(null)
  };
};
