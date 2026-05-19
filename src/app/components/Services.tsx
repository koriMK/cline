export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1632084687062-522d7b1d4b95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxidXRjaGVyJTIwc2hvcCUyMG1lYXQlMjBkaXNwbGF5fGVufDF8fHx8MTc3OTEzMDEwNnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Butcher shop with premium meats"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">See the big picture</h2>
              <p className="text-xl text-gray-600">Quality meets convenience in every order</p>
            </div>

            <div className="space-y-8">
              {[
                { num: '1', color: 'orange', title: 'Fresh Daily Cuts', desc: 'No more settling for anything less. Our meat is butchered fresh every morning and delivered within hours.' },
                { num: '2', color: 'blue', title: 'Get Orders On Time', desc: 'Track your delivery in real-time. Know exactly when your order will arrive with our live tracking system.' },
                { num: '3', color: 'green', title: 'Premium Quality', desc: 'Sourced from certified suppliers with rigorous health and safety inspections at every stage.' },
                { num: '4', color: 'purple', title: 'Bulk Orders Handled', desc: 'Perfect for restaurants and businesses. Custom butchering, flexible quantities, and volume pricing.' },
              ].map(item => (
                <div key={item.num} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                      <span className={`text-lg font-bold text-${item.color}-600`}>{item.num}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
