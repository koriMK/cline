import { Star } from 'lucide-react';

export default function Testimonial() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-12 shadow-xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">JM</div>
            </div>
            <div className="flex-1">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />)}
              </div>
              <blockquote className="text-2xl text-gray-900 leading-relaxed mb-6">
                "Nate Poultry Meat has transformed how we source ingredients. The quality is consistently excellent,
                delivery is always on time, and their bulk pricing helps our bottom line. We've been ordering from
                them for 3 years and wouldn't go anywhere else."
              </blockquote>
              <div>
                <div className="font-bold text-gray-900">James Mwangi</div>
                <div className="text-gray-600">Executive Chef, Serena Hotel Nairobi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
