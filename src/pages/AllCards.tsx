
import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import BankLogo from "@/components/BankLogo";
import AISearchResults from "@/components/AISearchResults";
import { useAISearch } from "@/hooks/useAISearch";
import { creditCards, categories, issuers } from "@/data/cards";
import { Search, Star, Filter, Brain } from "lucide-react";

const AllCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
  const [feeRange, setFeeRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [useAI, setUseAI] = useState(false);

  const { searchCards, isSearching, searchResults, clearResults } = useAISearch();

  const filteredCards = useMemo(() => {
    let cards = creditCards;

    // Apply category and issuer filters
    cards = cards.filter(card => {
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.some(cat => card.category.includes(cat));
      
      const matchesIssuer = selectedIssuers.length === 0 || 
                           selectedIssuers.includes(card.issuer.toLowerCase());
      
      const matchesFee = card.annual_fee >= feeRange[0] && card.annual_fee <= feeRange[1];
      
      return matchesCategory && matchesIssuer && matchesFee;
    });

    // Apply text search if not using AI
    if (!useAI && searchQuery) {
      cards = cards.filter(card => 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return cards;
  }, [selectedCategories, selectedIssuers, feeRange, searchQuery, useAI]);

  const handleSearch = async () => {
    if (useAI && searchQuery) {
      await searchCards(searchQuery, filteredCards);
    } else {
      clearResults();
    }
  };

  const displayCards = searchResults ? searchResults.cards : filteredCards;

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleIssuerChange = (issuerId: string, checked: boolean) => {
    if (checked) {
      setSelectedIssuers([...selectedIssuers, issuerId]);
    } else {
      setSelectedIssuers(selectedIssuers.filter(id => id !== issuerId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Credit Cards</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={useAI ? "Try: 'Best card for dining and movies' or 'No annual fee cashback card'" : "Search credit cards..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ai-search"
                checked={useAI}
                onCheckedChange={(checked) => {
                  setUseAI(checked as boolean);
                  if (!checked) clearResults();
                }}
              />
              <Label htmlFor="ai-search" className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-blue-600" />
                AI Search
              </Label>
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="min-w-[100px]"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          
          {/* AI Search Results */}
          {searchResults && (
            <AISearchResults
              explanation={searchResults.explanation}
              searchTerms={searchResults.searchTerms}
              resultsCount={displayCards.length}
            />
          )}
          
          <div className="text-sm text-gray-600">
            Showing {displayCards.length} of {creditCards.length} credit cards
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.icon} {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issuers */}
                <div>
                  <h3 className="font-medium mb-3">Banks</h3>
                  <div className="space-y-2">
                    {issuers.map((issuer) => (
                      <div key={issuer.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`issuer-${issuer.id}`}
                          checked={selectedIssuers.includes(issuer.id)}
                          onCheckedChange={(checked) => 
                            handleIssuerChange(issuer.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`issuer-${issuer.id}`} className="text-sm">
                          {issuer.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedIssuers([]);
                    setFeeRange([0, 10000]);
                    setSearchQuery('');
                    clearResults();
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Cards Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayCards.map((card) => (
                <Card key={card.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="relative">
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <div className="absolute top-2 right-2">
                        <BankLogo issuer={card.issuer} size="sm" className="bg-white rounded p-1 shadow-sm" />
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg leading-tight">{card.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{card.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Annual Fee:</span>
                          <div className="font-medium">₹{card.annual_fee}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Joining Fee:</span>
                          <div className="font-medium">₹{card.joining_fee}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <strong>Rewards:</strong> {card.rewards}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {card.category.slice(0, 3).map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <strong>Key Benefits:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {card.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="text-xs">{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button asChild className="flex-1" size="sm">
                          <Link to={`/card/${card.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1" size="sm">
                          <a href={card.apply_url} target="_blank" rel="noopener noreferrer">
                            Apply Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {displayCards.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No cards found</div>
                <div className="text-gray-600">Try adjusting your filters or search terms</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCards;
