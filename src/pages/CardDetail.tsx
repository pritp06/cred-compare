
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import BankLogo from "@/components/BankLogo";
import { creditCards } from "@/data/cards";
import { Star, ArrowLeft, ExternalLink, CheckCircle, XCircle } from "lucide-react";

const CardDetail = () => {
  const { id } = useParams();
  const card = creditCards.find(c => c.id === id);

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Card not found</h1>
          <Button asChild>
            <Link to="/cards">Back to All Cards</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/cards">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Cards
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Card Image and Quick Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <div className="relative">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="absolute top-2 right-2">
                    <BankLogo issuer={card.issuer} size="md" className="bg-white rounded p-2 shadow-sm" />
                  </div>
                </div>
                <CardTitle className="text-xl">{card.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium text-gray-600">{card.issuer}</div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-medium ml-1">{card.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Joining Fee</span>
                      <div className="text-lg font-semibold">₹{card.joining_fee}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Annual Fee</span>
                      <div className="text-lg font-semibold">₹{card.annual_fee}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {card.category.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Button asChild className="w-full" size="lg">
                      <a href={card.apply_url} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/compare?cards=${card.id}`}>
                        Add to Compare
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Rewards Program</h4>
                        <p className="text-gray-600">{card.rewards}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Interest Rate</h4>
                        <p className="text-gray-600">{card.interest_rate}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Credit Limit</h4>
                        <p className="text-gray-600">{card.credit_limit}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Eligibility</h4>
                        <p className="text-gray-600">{card.eligibility}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {card.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="eligibility" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Minimum Income Requirement</h4>
                      <p className="text-blue-700">{card.eligibility}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">General Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Age: 21-60 years for salaried, 21-65 years for self-employed</li>
                        <li>Good credit score (750+ recommended)</li>
                        <li>Stable income source</li>
                        <li>Valid KYC documents</li>
                        <li>No recent defaults or loan settlements</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pros-cons" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-700">Pros</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {card.pros.map((pro, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-700">Cons</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {card.cons.map((con, index) => (
                          <li key={index} className="flex items-start">
                            <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Similar Cards Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {creditCards
              .filter(c => c.id !== card.id && c.category.some(cat => card.category.includes(cat)))
              .slice(0, 3)
              .map((similarCard) => (
                <Card key={similarCard.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="relative">
                      <img 
                        src={similarCard.image} 
                        alt={similarCard.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <div className="absolute top-2 right-2">
                        <BankLogo issuer={similarCard.issuer} size="sm" className="bg-white rounded p-1 shadow-sm" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{similarCard.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="text-gray-600">Annual Fee: </span>
                        <span className="font-medium">₹{similarCard.annual_fee}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link to={`/card/${similarCard.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
