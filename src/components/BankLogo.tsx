
import { issuers } from "@/data/cards";

interface BankLogoProps {
  issuer: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BankLogo = ({ issuer, size = "md", className = "" }: BankLogoProps) => {
  const issuerData = issuers.find(i => i.name === issuer || i.id === issuer.toLowerCase());
  
  if (!issuerData) {
    return null;
  }

  const sizeClasses = {
    sm: "h-6 w-12",
    md: "h-8 w-16", 
    lg: "h-10 w-20"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={issuerData.logo} 
        alt={`${issuerData.name} logo`}
        className={`${sizeClasses[size]} object-contain rounded`}
      />
    </div>
  );
};

export default BankLogo;
