import { useState } from "react";
import { createLeadInSupabase } from "@/lib/supabaseOperations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    type: 'destination' | 'hotel' | 'activity';
    price: number;
  };
  selectedItems?: any[];
  totalAmount?: number;
}

export default function BookingModal({ isOpen, onClose, item, selectedItems, totalAmount }: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Name and email are required!');
      return;
    }

    try {
      setLoading(true);
      await createLeadInSupabase({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        item_type: item.type,
        item_id: item.id,
        item_name: item.name,
        item_price: item.price,
        total_amount: totalAmount || item.price,
        selected_items: selectedItems || null,
        status: 'pending'
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setSubmitted(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {submitted ? "Booking Submitted!" : "Book Your Trip"}
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Thank you for your interest!</h3>
            <p className="text-muted-foreground mb-4">
              We've received your booking inquiry for <strong>{item.name}</strong>. 
              Our team will contact you within 24 hours to finalize your trip details.
            </p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-muted-foreground">
                {totalAmount ? `Total: $${totalAmount}` : `Price: $${item.price}`}
              </p>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Textarea
                placeholder="Special requests or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Booking Inquiry"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}