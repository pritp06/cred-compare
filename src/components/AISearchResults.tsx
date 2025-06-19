
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";

interface AISearchResultsProps {
  explanation: string;
  searchTerms: string[];
  resultsCount: number;
}

const AISearchResults = ({ explanation, searchTerms, resultsCount }: AISearchResultsProps) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2 text-blue-600">
            <Brain className="w-5 h-5" />
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">AI Search Results</h3>
            <p className="text-sm text-blue-800 mb-3">{explanation}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {searchTerms.map((term, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {term}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-blue-600">
              Found {resultsCount} matching cards using AI analysis
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISearchResults;
