
import { CreditCard, CardCategory, CardIssuer } from "@/types/card";

export const creditCards: CreditCard[] = [
  {
    id: "sbi-simplysave",
    name: "SBI SimplySAVE Credit Card",
    issuer: "SBI",
    joining_fee: 499,
    annual_fee: 499,
    features: [
      "10x rewards on dining, movies, groceries",
      "Fuel surcharge waiver",
      "Spend ₹1,00,000 in a year to waive annual fee"
    ],
    pros: ["Good for daily use", "Affordable"],
    cons: ["No lounge access"],
    category: ["shopping", "fuel"],
    image: "/placeholder.svg?height=200&width=320&text=SBI+SimplySAVE",
    apply_url: "https://www.sbicard.com/en/personal/credit-cards/simplysave.page",
    rewards: "10x on dining, 5x on groceries",
    eligibility: "₹3 Lakh annual income",
    interest_rate: "3.5% per month",
    credit_limit: "₹50,000 - ₹5 Lakh",
    rating: 4.2
  },
  {
    id: "hdfc-regalia",
    name: "HDFC Bank Regalia Credit Card",
    issuer: "HDFC",
    joining_fee: 2500,
    annual_fee: 2500,
    features: [
      "4 reward points per ₹150 spent",
      "Domestic airport lounge access",
      "Annual fee waiver on spending ₹3 lakh"
    ],
    pros: ["Premium benefits", "Good reward rate", "Lounge access"],
    cons: ["High annual fee", "Income requirement"],
    category: ["travel", "premium"],
    image: "/placeholder.svg?height=200&width=320&text=HDFC+Regalia",
    apply_url: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia",
    rewards: "4x points on all spends",
    eligibility: "₹6 Lakh annual income",
    interest_rate: "3.4% per month",
    credit_limit: "₹1 Lakh - ₹10 Lakh",
    rating: 4.5
  },
  {
    id: "axis-myzone",
    name: "Axis Bank MY ZONE Credit Card",
    issuer: "Axis Bank",
    joining_fee: 500,
    annual_fee: 500,
    features: [
      "2% cashback on online spends",
      "BookMyShow voucher worth ₹500",
      "Annual fee waiver on ₹1.5 lakh spend"
    ],
    pros: ["Good for online shopping", "Movie vouchers", "Low fee"],
    cons: ["Limited offline benefits"],
    category: ["cashback", "shopping"],
    image: "/placeholder.svg?height=200&width=320&text=Axis+MY+ZONE",
    apply_url: "https://www.axisbank.com/retail/cards/credit-card/my-zone",
    rewards: "2% cashback online",
    eligibility: "₹3 Lakh annual income",
    interest_rate: "3.6% per month",
    credit_limit: "₹25,000 - ₹3 Lakh",
    rating: 4.0
  },
  {
    id: "icici-amazon-pay",
    name: "Amazon Pay ICICI Credit Card",
    issuer: "ICICI",
    joining_fee: 0,
    annual_fee: 0,
    features: [
      "5% cashback on Amazon",
      "2% cashback on paying bills",
      "1% cashback on other spends"
    ],
    pros: ["No annual fee", "Great for Amazon users", "Bill payment rewards"],
    cons: ["Limited offline benefits", "Amazon Prime requirement for max benefits"],
    category: ["cashback", "shopping"],
    image: "/placeholder.svg?height=200&width=320&text=Amazon+Pay+ICICI",
    apply_url: "https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay",
    rewards: "5% on Amazon, 2% on bills",
    eligibility: "₹3 Lakh annual income",
    interest_rate: "3.5% per month",
    credit_limit: "₹50,000 - ₹5 Lakh",
    rating: 4.6
  },
  {
    id: "sbi-elite",
    name: "SBI Elite Credit Card",
    issuer: "SBI",
    joining_fee: 4999,
    annual_fee: 4999,
    features: [
      "5x reward points on dining and hotels",
      "Domestic and international lounge access",
      "Annual milestone benefits"
    ],
    pros: ["Premium benefits", "High reward rate", "Global acceptance"],
    cons: ["High fees", "Income requirement"],
    category: ["travel", "premium"],
    image: "/placeholder.svg?height=200&width=320&text=SBI+Elite",
    apply_url: "https://www.sbicard.com/en/personal/credit-cards/elite.page",
    rewards: "5x on dining & hotels",
    eligibility: "₹7.5 Lakh annual income",
    interest_rate: "3.35% per month",
    credit_limit: "₹2 Lakh - ₹15 Lakh",
    rating: 4.3
  },
  {
    id: "kotak-league-platinum",
    name: "Kotak League Platinum Credit Card",
    issuer: "Kotak",
    joining_fee: 1000,
    annual_fee: 1000,
    features: [
      "4% fuel surcharge waiver",
      "1% cashback on all spends",
      "Dining discounts"
    ],
    pros: ["Fuel benefits", "Dining offers", "Easy approval"],
    cons: ["Low reward rate", "Limited premium benefits"],
    category: ["fuel", "shopping"],
    image: "/placeholder.svg?height=200&width=320&text=Kotak+League",
    apply_url: "https://www.kotak.com/en/personal-banking/cards/credit-cards.html",
    rewards: "1% cashback on all spends",
    eligibility: "₹4 Lakh annual income",
    interest_rate: "3.49% per month",
    credit_limit: "₹75,000 - ₹4 Lakh",
    rating: 3.8
  }
];

export const categories: CardCategory[] = [
  {
    id: "cashback",
    name: "Cashback",
    description: "Get cash back on your purchases",
    icon: "💰"
  },
  {
    id: "travel",
    name: "Travel",
    description: "Earn miles and travel benefits",
    icon: "✈️"
  },
  {
    id: "fuel",
    name: "Fuel",
    description: "Save on fuel purchases",
    icon: "⛽"
  },
  {
    id: "shopping",
    name: "Shopping",
    description: "Rewards for retail purchases",
    icon: "🛍️"
  },
  {
    id: "premium",
    name: "Premium",
    description: "Luxury benefits and services",
    icon: "💎"
  }
];

export const issuers: CardIssuer[] = [
  {
    id: "sbi",
    name: "SBI Card",
    logo: "/placeholder.svg?height=40&width=80&text=SBI"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    logo: "/placeholder.svg?height=40&width=80&text=HDFC"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    logo: "/placeholder.svg?height=40&width=80&text=ICICI"
  },
  {
    id: "axis",
    name: "Axis Bank",
    logo: "/placeholder.svg?height=40&width=80&text=Axis"
  },
  {
    id: "kotak",
    name: "Kotak Bank",
    logo: "/placeholder.svg?height=40&width=80&text=Kotak"
  }
];
