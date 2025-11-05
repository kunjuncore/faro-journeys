import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Destinations from "./pages/Destinations";
import Hotels from "./pages/Hotels";
import Activities from "./pages/Activities";
import TravelThemes from "./pages/TravelThemes";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import DestinationDetail from "./pages/DestinationDetail";
import HotelDetail from "./pages/HotelDetail";
import ActivityDetail from "./pages/ActivityDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import NotFound from "./pages/NotFound";
import AdminLogin from "@/pages/admin/Login"; 
import AdminLayout from "@/pages/admin/Layout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminDestinations from "@/pages/admin/Destinations";
import AdminHotels from "@/pages/admin/Hotels";
import AdminActivities from "@/pages/admin/Activities";
import AdminBookings from "@/pages/admin/Bookings";
import AdminLeads from "@/pages/admin/Leads";
import ErrorBoundary from "@/components/ErrorBoundary";


const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/themes" element={<TravelThemes />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="activities" element={<AdminActivities />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="leads" element={<AdminLeads />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
