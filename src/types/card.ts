
export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  joining_fee: number;
  annual_fee: number;
  features: string[];
  pros: string[];
  cons: string[];
  category: string[];
  image: string;
  apply_url: string;
  rewards: string;
  eligibility: string;
  interest_rate: string;
  credit_limit: string;
  rating: number;
}

export interface CardCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface CardIssuer {
  id: string;
  name: string;
  logo: string;
}
