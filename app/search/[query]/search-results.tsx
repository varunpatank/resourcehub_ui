"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Search } from "lucide-react";

interface Offer {
  name: string;
  description: string;
  url: string;
  forUseBy: string;
}

interface Response {
  [category: string]: Offer[];
}

// Expanded mock data with more comprehensive offerings
const mockOffers: Response = {
  "Development": [
    {
      name: "GitHub Student Developer Pack",
      description: "Access to professional developer tools and services",
      url: "https://education.github.com/pack",
      forUseBy: "students"
    },
    {
      name: "JetBrains Student Pack",
      description: "Free access to all JetBrains IDEs",
      url: "https://www.jetbrains.com/community/education/",
      forUseBy: "students"
    },
    {
      name: "Visual Studio Code",
      description: "Free, powerful code editor with extensive plugin support",
      url: "https://code.visualstudio.com/",
      forUseBy: "everyone"
    }
  ],
  "Cloud": [
    {
      name: "AWS Educate",
      description: "Free access to AWS services and training",
      url: "https://aws.amazon.com/education/awseducate/",
      forUseBy: "students"
    },
    {
      name: "Microsoft Azure for Students",
      description: "Free Azure credits and developer tools",
      url: "https://azure.microsoft.com/free/students/",
      forUseBy: "students"
    }
  ],
  "Design": [
    {
      name: "Figma Education",
      description: "Professional design tools for students",
      url: "https://www.figma.com/education/",
      forUseBy: "students"
    },
    {
      name: "Adobe Creative Cloud",
      description: "Special student pricing for Creative Cloud apps",
      url: "https://www.adobe.com/creativecloud/buy/students.html",
      forUseBy: "students"
    }
  ],
  "Hosting": [
    {
      name: "Vercel for Students",
      description: "Free hosting and deployment platform",
      url: "https://vercel.com/education",
      forUseBy: "students"
    },
    {
      name: "Netlify",
      description: "Free tier for hosting static sites and web apps",
      url: "https://www.netlify.com/",
      forUseBy: "everyone"
    }
  ]
};

// Helper function to filter offers based on query
function filterOffers(offers: Response, query: string): Response {
  if (query === 'all') return offers;
  
  const filtered: Response = {};
  Object.entries(offers).forEach(([category, categoryOffers]) => {
    const matches = categoryOffers.filter(offer => 
      offer.name.toLowerCase().includes(query.toLowerCase()) ||
      offer.description.toLowerCase().includes(query.toLowerCase()) ||
      category.toLowerCase().includes(query.toLowerCase()) ||
      offer.forUseBy.toLowerCase().includes(query.toLowerCase())
    );
    if (matches.length > 0) {
      filtered[category] = matches;
    }
  });
  return filtered;
}

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<Response>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    setLoading(true);
    // Filter results client-side
    const filtered = filterOffers(mockOffers, query);
    setResults(filtered);
    setLoading(false);
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-primary/10 rounded w-1/4"></div>
            <div className="h-32 bg-primary/10 rounded"></div>
            <div className="h-32 bg-primary/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Search className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">
            Results for "{decodeURIComponent(query)}"
          </h1>
        </div>

        {Object.keys(results).length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">No results found for your search.</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(results).map(([category, offers]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{offer.name}</CardTitle>
                      <CardDescription>For {offer.forUseBy}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{offer.description}</p>
                      <Button asChild variant="outline" className="w-full">
                        <a
                          href={offer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Visit Resource
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}