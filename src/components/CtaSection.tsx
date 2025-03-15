
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="bg-ielts-green/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ace your IELTS exam?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Start practicing today with our comprehensive test collection and get personalized feedback on your performance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tests">
              <Button className="btn-primary">
                Browse Practice Tests
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="btn-secondary">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
