import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import BankLogo from "@/components/BankLogo";
import UserMenu from "@/components/UserMenu";
import { creditCards, categories } from "@/data/cards";
import { Search, Star, TrendingUp, Shield, CreditCard } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredCards = creditCards.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Updated Navbar with User Menu */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                CardCompare
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/cards" className="text-gray-700 hover:text-blue-600">
                All Cards
              </Link>
              <Link to="/compare" className="text-gray-700 hover:text-blue-600">
                Compare
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600">
                Blog
              </Link>
            </div>
            <UserMenu />
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-blue-600 block">Credit Card</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare credit cards from top Indian banks. Find the best rewards, 
            lowest fees, and perfect benefits for your lifestyle.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search credit cards by name, bank, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500"
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg"
                asChild
              >
                <Link to={`/cards${searchQuery ? `?search=${searchQuery}` : ''}`}>
                  Search
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Credit Cards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15+</div>
              <div className="text-gray-600">Banks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">Free</div>
              <div className="text-gray-600">Comparison</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/cards?category=${category.id}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Cards</h2>
            <Button variant="outline" asChild>
              <Link to="/cards">View All Cards</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCards.map((card) => (
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
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{card.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annual Fee:</span>
                      <span className="font-medium">₹{card.annual_fee}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Rewards:</strong> {card.rewards}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {card.category.slice(0, 2).map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button asChild className="flex-1">
                        <Link to={`/card/${card.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1">
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
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose CardCompare?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Rewards</h3>
              <p className="text-gray-600">Find cards with the highest reward rates and best benefits for your spending habits.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-gray-600">All card applications are processed securely through official bank channels.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Comparison</h3>
              <p className="text-gray-600">Compare up to 3 cards side by side to make the perfect choice for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Credit Card?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who found their ideal credit card with CardCompare
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/cards">Start Comparing Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
