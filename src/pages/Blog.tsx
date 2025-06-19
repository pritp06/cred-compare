
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Calendar, User, Clock } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Credit Cards for Beginners in 2024",
      excerpt: "Starting your credit journey? Here are the best credit cards for first-time users with no credit history.",
      category: "Beginner Guide",
      author: "CardCompare Team",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=400&text=Beginner+Guide"
    },
    {
      id: 2,
      title: "How to Maximize Credit Card Rewards",
      excerpt: "Learn proven strategies to earn maximum rewards and cashback from your credit cards.",
      category: "Rewards",
      author: "Finance Expert",
      date: "2024-01-12",
      readTime: "7 min read",
      image: "/placeholder.svg?height=200&width=400&text=Rewards+Guide"
    },
    {
      id: 3,
      title: "Understanding Credit Card Interest Rates",
      excerpt: "Everything you need to know about APR, interest calculations, and how to avoid unnecessary charges.",
      category: "Education",
      author: "CardCompare Team",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "/placeholder.svg?height=200&width=400&text=Interest+Rates"
    },
    {
      id: 4,
      title: "Best Travel Credit Cards for International Trips",
      excerpt: "Compare the top travel credit cards that offer the best benefits for international travelers.",
      category: "Travel",
      author: "Travel Expert",
      date: "2024-01-08",
      readTime: "8 min read",
      image: "/placeholder.svg?height=200&width=400&text=Travel+Cards"
    },
    {
      id: 5,
      title: "Credit Score Impact: How Credit Cards Affect Your CIBIL Score",
      excerpt: "Understand how credit card usage impacts your credit score and tips to improve it.",
      category: "Credit Score",
      author: "Finance Expert",
      date: "2024-01-05",
      readTime: "6 min read",
      image: "/placeholder.svg?height=200&width=400&text=Credit+Score"
    },
    {
      id: 6,
      title: "Cashback vs Reward Points: Which is Better?",
      excerpt: "A detailed comparison of cashback and reward point credit cards to help you choose the right one.",
      category: "Comparison",
      author: "CardCompare Team",
      date: "2024-01-03",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=400&text=Cashback+vs+Points"
    }
  ];

  const categories = ["All", "Beginner Guide", "Rewards", "Travel", "Education", "Credit Score", "Comparison"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Credit Card Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert insights, tips, and guides to help you make the most of your credit cards
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "All" ? "default" : "secondary"}
              className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <Badge className="mb-4">{blogPosts[0].category}</Badge>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(blogPosts[0].date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {blogPosts[0].readTime}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-xs text-gray-500 space-x-3">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-blue-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with Credit Card Tips</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest credit card news, reviews, and money-saving tips delivered to your inbox
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
