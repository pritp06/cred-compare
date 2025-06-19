
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import { creditCards } from "@/data/cards";
import { Star, X, Plus } from "lucide-react";

const Compare = () => {
  const [searchParams] = useSearchParams();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  useEffect(() => {
    const cardsParam = searchParams.get('cards');
    if (cardsParam) {
      const cardIds = cardsParam.split(',').filter(id => 
        creditCards.some(card => card.id === id)
      );
      setSelectedCards(cardIds.slice(0, 3));
    }
  }, [searchParams]);

  const handleAddCard = (cardId: string) => {
    if (selectedCards.length < 3 && !selectedCards.includes(cardId)) {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleRemoveCard = (cardId: string) => {
    setSelectedCards(selectedCards.filter(id => id !== cardId));
  };

  const getSelectedCardData = () => {
    return selectedCards.map(id => creditCards.find(card => card.id === id)!);
  };

  const comparisonRows = [
    { label: "Annual Fee", key: "annual_fee", format: (value: any) => `₹${value}` },
    { label: "Joining Fee", key: "joining_fee", format: (value: any) => `₹${value}` },
    { label: "Rewards", key: "rewards" },
    { label: "Interest Rate", key: "interest_rate" },
    { label: "Credit Limit", key: "credit_limit" },
    { label: "Eligibility", key: "eligibility" },
    { label: "Rating", key: "rating", format: (value: any) => `${value}/5` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Compare Credit Cards</h1>
          <p className="text-gray-600">
            Select up to 3 credit cards to compare their features, fees, and benefits side by side.
          </p>
        </div>

        {/* Card Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[0, 1, 2].map((index) => (
            <Card key={index} className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg">
                  Card {index + 1}
                  {selectedCards[index] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-6 w-6 p-0"
                      onClick={() => handleRemoveCard(selectedCards[index])}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCards[index] ? (
                  (() => {
                    const card = creditCards.find(c => c.id === selectedCards[index])!;
                    return (
                      <div className="space-y-4">
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{card.name}</h3>
                          <p className="text-sm text-gray-600">{card.issuer}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{card.rating}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {card.category.slice(0, 2).map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                        <Button asChild size="sm" className="w-full">
                          <Link to={`/card/${card.id}`}>View Details</Link>
                        </Button>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-8">
                    <Plus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Select a credit card to compare</p>
                    <Select onValueChange={handleAddCard}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a card" />
                      </SelectTrigger>
                      <SelectContent>
                        {creditCards
                          .filter(card => !selectedCards.includes(card.id))
                          .map((card) => (
                            <SelectItem key={card.id} value={card.id}>
                              {card.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedCards.length >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48">Feature</TableHead>
                      {getSelectedCardData().map((card) => (
                        <TableHead key={card.id} className="text-center min-w-48">
                          {card.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonRows.map((row) => (
                      <TableRow key={row.key}>
                        <TableCell className="font-medium">{row.label}</TableCell>
                        {getSelectedCardData().map((card) => (
                          <TableCell key={card.id} className="text-center">
                            {row.format ? row.format(card[row.key as keyof typeof card]) : card[row.key as keyof typeof card]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                    
                    {/* Features Row */}
                    <TableRow>
                      <TableCell className="font-medium">Key Features</TableCell>
                      {getSelectedCardData().map((card) => (
                        <TableCell key={card.id} className="text-left">
                          <ul className="text-sm space-y-1">
                            {card.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="text-gray-600">• {feature}</li>
                            ))}
                          </ul>
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {/* Pros Row */}
                    <TableRow>
                      <TableCell className="font-medium">Pros</TableCell>
                      {getSelectedCardData().map((card) => (
                        <TableCell key={card.id} className="text-left">
                          <ul className="text-sm space-y-1">
                            {card.pros.map((pro, index) => (
                              <li key={index} className="text-green-600">✓ {pro}</li>
                            ))}
                          </ul>
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {/* Cons Row */}
                    <TableRow>
                      <TableCell className="font-medium">Cons</TableCell>
                      {getSelectedCardData().map((card) => (
                        <TableCell key={card.id} className="text-left">
                          <ul className="text-sm space-y-1">
                            {card.cons.map((con, index) => (
                              <li key={index} className="text-red-600">✗ {con}</li>
                            ))}
                          </ul>
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {/* Apply Now Row */}
                    <TableRow>
                      <TableCell className="font-medium">Apply</TableCell>
                      {getSelectedCardData().map((card) => (
                        <TableCell key={card.id} className="text-center">
                          <Button asChild size="sm">
                            <a href={card.apply_url} target="_blank" rel="noopener noreferrer">
                              Apply Now
                            </a>
                          </Button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedCards.length < 2 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">
                Select at least 2 cards to start comparing
              </div>
              <p className="text-gray-600 mb-6">
                Choose credit cards from the dropdowns above to see a detailed comparison
              </p>
              <Button asChild>
                <Link to="/cards">Browse All Cards</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Compare;
