/**
 * GameCritic — App Root
 * Design: Obsidian Edge (Dark Luxury / Premium Gaming Editorial)
 * Routes: / (Home), /reviews (All Reviews), /reviews/:slug (Review Detail)
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import ReviewDetail from "./pages/ReviewDetail";
import AdvancedSearch from "./pages/AdvancedSearch";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.012 265)" }}>
      <Header />
      <div className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/search" component={AdvancedSearch} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/reviews/:slug" component={ReviewDetail} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
