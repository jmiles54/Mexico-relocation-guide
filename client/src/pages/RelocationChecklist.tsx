import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Calendar, ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  priority: "high" | "medium" | "low";
  links?: { label: string; url: string }[];
}

export default function RelocationChecklist() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      console.log('Checklist updated:', Array.from(newSet));
      return newSet;
    });
  };

  const phases = [
    {
      phase: "3-6 Months Before Move",
      items: [
        {
          id: "visa-research",
          title: "Research visa options",
          description: "Determine which visa type fits your situation: Temporary Resident, Permanent Resident, or tourist visa renewal strategy.",
          timeframe: "Week 1-2",
          priority: "high" as const,
          links: [
            { label: "Mexican Consulate Info", url: "#" },
            { label: "Visa Calculator", url: "#" }
          ]
        },
        {
          id: "financial-planning",
          title: "Set up international banking",
          description: "Open accounts that minimize foreign transaction fees. Consider Wise, Charles Schwab, or local Mexican banks.",
          timeframe: "Week 2-4",
          priority: "high" as const,
          links: [
            { label: "Bank Comparison Tool", url: "#" }
          ]
        },
        {
          id: "housing-research",
          title: "Research neighborhoods remotely",
          description: "Use this guide to compare neighborhoods. Join Facebook groups to ask questions and see current rental listings.",
          timeframe: "Ongoing",
          priority: "high" as const
        },
        {
          id: "healthcare-plan",
          title: "Research healthcare options",
          description: "Decide between IMSS (public), private insurance, or self-pay. Get quotes and understand coverage.",
          timeframe: "Month 2",
          priority: "medium" as const
        }
      ]
    },
    {
      phase: "1-2 Months Before Move",
      items: [
        {
          id: "scouting-trip",
          title: "Book scouting trip",
          description: "Spend 1-2 weeks visiting your top 3 neighborhoods. Tour apartments, check walkability, visit venues.",
          timeframe: "6-8 weeks before",
          priority: "high" as const
        },
        {
          id: "documents",
          title: "Gather required documents",
          description: "Birth certificate, passport, proof of income, bank statements (apostilled if needed). Make digital + physical copies.",
          timeframe: "4-6 weeks before",
          priority: "high" as const
        },
        {
          id: "shipping",
          title: "Plan belongings strategy",
          description: "Decide: ship container, bring suitcases, or buy everything new. Most expats recommend starting fresh.",
          timeframe: "3-4 weeks before",
          priority: "medium" as const
        },
        {
          id: "us-address",
          title: "Set up U.S. mail forwarding",
          description: "Get a mail forwarding service (like Traveling Mailbox) or trusted friend/family to receive mail.",
          timeframe: "2-3 weeks before",
          priority: "medium" as const
        }
      ]
    },
    {
      phase: "First Week in Mexico",
      items: [
        {
          id: "temporary-housing",
          title: "Secure temporary housing",
          description: "Book Airbnb or short-term rental for first 2-4 weeks while you apartment hunt in person.",
          timeframe: "Day 1",
          priority: "high" as const
        },
        {
          id: "sim-card",
          title: "Get Mexican SIM card",
          description: "Telcel or AT&T Mexico. Bring unlocked phone. Visit OXXO or official store.",
          timeframe: "Day 1-2",
          priority: "high" as const
        },
        {
          id: "apartment-tours",
          title: "Tour apartments in person",
          description: "Visit your shortlist. Check water pressure, internet, noise levels, security. Negotiate lease terms.",
          timeframe: "Week 1",
          priority: "high" as const
        },
        {
          id: "neighborhood-walk",
          title: "Walk your neighborhood",
          description: "Find grocery stores, pharmacies, bus stops, ATMs. Test walkability at different times of day.",
          timeframe: "Week 1",
          priority: "medium" as const
        }
      ]
    },
    {
      phase: "First Month",
      items: [
        {
          id: "bank-account",
          title: "Open local bank account",
          description: "Bring passport, proof of address, and reference letter. BBVA, Santander, or Banorte are popular.",
          timeframe: "Week 2-3",
          priority: "high" as const
        },
        {
          id: "internet",
          title: "Set up internet/utilities",
          description: "Telmex, Izzi, or TotalPlay for internet. Landlord may handle utilities or you pay at OXXO.",
          timeframe: "Week 1-2",
          priority: "high" as const
        },
        {
          id: "cfdi",
          title: "Get RFC/CURP numbers",
          description: "For banking, contracts, and paying utilities. Visit SAT office with passport and proof of address.",
          timeframe: "Week 2-4",
          priority: "medium" as const
        },
        {
          id: "doctor",
          title: "Find English-speaking doctor",
          description: "Get recommendations from expat groups. Do introductory visit. Save emergency contacts.",
          timeframe: "Week 3-4",
          priority: "medium" as const
        },
        {
          id: "social",
          title: "Attend expat meetups",
          description: "Visit venues from this guide. Join 2-3 Facebook groups. Attend weekly events to build community.",
          timeframe: "Ongoing",
          priority: "low" as const
        }
      ]
    }
  ];

  const totalItems = phases.reduce((sum, phase) => sum + phase.items.length, 0);
  const completedCount = completedItems.size;
  const progress = (completedCount / totalItems) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-checklist-title">Relocation Checklist</h1>
          <p className="text-muted-foreground">
            Step-by-step guide to relocating to Mexico
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {totalItems} tasks completed
                </p>
              </div>
              <div className="text-3xl font-bold text-primary">
                {Math.round(progress)}%
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-primary rounded-full h-3 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Checklist by Phase */}
        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
          {phases.map((phase, phaseIndex) => {
            const phaseCompleted = phase.items.filter(item => 
              completedItems.has(item.id)
            ).length;
            const phaseTotal = phase.items.length;
            
            return (
              <AccordionItem
                key={phaseIndex}
                value={`item-${phaseIndex}`}
                className="border rounded-lg"
              >
                <AccordionTrigger className="px-6 hover:no-underline" data-testid={`accordion-phase-${phaseIndex}`}>
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      {phaseCompleted === phaseTotal ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                      <div className="text-left">
                        <h3 className="font-semibold">{phase.phase}</h3>
                        <p className="text-sm text-muted-foreground">
                          {phaseCompleted}/{phaseTotal} completed
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4 mt-4">
                    {phase.items.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 border rounded-lg ${
                          completedItems.has(item.id) ? 'bg-muted/50' : ''
                        }`}
                        data-testid={`checklist-item-${item.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={completedItems.has(item.id)}
                            onCheckedChange={() => toggleItem(item.id)}
                            className="mt-1"
                            data-testid={`checkbox-${item.id}`}
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className={`font-semibold ${
                                completedItems.has(item.id) ? 'line-through text-muted-foreground' : ''
                              }`}>
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Badge variant="outline" className="text-xs">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {item.timeframe}
                                </Badge>
                                <Badge className={`${getPriorityColor(item.priority)} border text-xs`}>
                                  {item.priority}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {item.description}
                            </p>
                            {item.links && item.links.length > 0 && (
                              <div className="flex gap-2 flex-wrap">
                                {item.links.map((link: { label: string; url: string }, linkIndex: number) => (
                                  <Button
                                    key={linkIndex}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => console.log('Opening:', link.url)}
                                    data-testid={`link-${item.id}-${linkIndex}`}
                                  >
                                    {link.label}
                                    <ExternalLink className="w-3 h-3 ml-2" />
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
