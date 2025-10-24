import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Neighborhood from "@/pages/Neighborhood";
import Compare from "@/pages/Compare";
import NeighborhoodMatcher from "@/pages/NeighborhoodMatcher";
import ActivityDiscovery from "@/pages/ActivityDiscovery";
import RelocationChecklist from "@/pages/RelocationChecklist";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/neighborhood/:id" component={Neighborhood} />
      <Route path="/compare" component={Compare} />
      <Route path="/neighborhood-matcher" component={NeighborhoodMatcher} />
      <Route path="/activities" component={ActivityDiscovery} />
      <Route path="/checklist" component={RelocationChecklist} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
