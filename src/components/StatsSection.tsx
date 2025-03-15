
import { BookOpen, TrendingUp, MessageCircle } from 'lucide-react';

const stats = [
  {
    title: 'Practice Tests',
    value: '40+',
    description: 'Comprehensive practice tests covering all IELTS modules',
    icon: BookOpen,
    color: 'bg-ielts-green',
  },
  {
    title: 'Success Rate',
    value: '94%',
    description: 'Of our students achieve their target band score',
    icon: TrendingUp,
    color: 'bg-ielts-blue',
  },
  {
    title: 'Expert Feedback',
    value: '24/7',
    description: 'Access to detailed performance analytics and improvement tips',
    icon: MessageCircle,
    color: 'bg-ielts-purple',
  },
];

export function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div 
            key={stat.title} 
            className="stat-card flex flex-col animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start">
              <div className={`module-icon ${stat.color} mb-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{stat.title}</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <p className="text-gray-500 text-sm">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
