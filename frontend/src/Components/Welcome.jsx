import React from 'react';
import { Button } from './ui/Button'; // Verify this path is correct
import { ArrowRight } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="bg-white text-gray-900" style={{ marginTop: '1px' }}>
      {/* New Superpower-style Hero + Testimonial Section */}
      <section
        className="bg-cover bg-center py-12 flex justify-center items-center"
        style={{ backgroundImage: "url('/herooo3.png')" }} // Ensure /herooo3.png exists in public folder
      >
        <div className="text-center space-y-6 text-white">
          <h2 className="text-4xl font-bold">
            Welcome to Healthcare’s Open-Source Revolution.
          </h2>
          <h3 className="text-2xl font-semibold">REAL STORIES, REAL IMPACT</h3>

          <div className="space-y-4">
            {/* Review 1 */}
            <div className="bg-white bg-opacity-30 p-4 rounded-md shadow-md">
              <p className="italic">
                “I found an amazing surgeon in Spain—Life-Finder saved me time and
                money.” – Sarah, UK
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-white bg-opacity-30 p-4 rounded-md shadow-md">
              <p className="italic">
                “I finally understood my treatment options without getting ripped
                off.” – Alex, Germany
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-white bg-opacity-30 p-4 rounded-md shadow-md">
              <p className="italic">
                “Best decision I made for my health. Everything was clear and
                transparent.” – Maria, USA
              </p>
            </div>
          </div>

          <p className="font-semibold text-lg">
            You’re not alone. Millions are taking control.
          </p>

          {/* Centered button */}
          <div className="flex justify-center mt-6">
            <a href="https://life-finder.com/pricing">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-white border-white hover:bg-white hover:text-black"
                aria-label="Join the healthcare revolution"
              >
                Join the Movement <ArrowRight size={16} />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;