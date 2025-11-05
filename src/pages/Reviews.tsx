import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Reviews() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
            <p className="text-muted-foreground text-lg">
              Read what our travelers say about their experiences - coming soon!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}