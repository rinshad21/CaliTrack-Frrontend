import { Activity, Dumbbell, TrendingUp } from "lucide-react";
import { Link } from "react-router";
const ContentSection = () => {
  return (
    <div className=" p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Fitness Hub
          </h1>
          <p className="dark:text-slate-400">
            Track your journey and celebrate progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/exercise" className="group cursor-pointer">
            <div className="absolute inset-0  transition-opacity duration-300" />
            <div className="relative  rounded-2xl p-8 shadow-xl border border-slate-600 hover:border-amber-400 transition-all duration-300 overflow-hidden h-full">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="w-8 h-8 text-slate-900" />
                </div>
              </div>

              <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  Track Workouts
                </h2>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Log your daily exercises, sets, reps, and intensity. Stay
                  consistent with your fitness routine.
                </p>
              </div>

              <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-slate-600 group-hover:bg-amber-400 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                <svg
                  className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link to="progress" className="group cursor-pointer">
            <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 shadow-xl border border-slate-600 hover:border-cyan-400 transition-all duration-300 overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-slate-900" />
                </div>
              </div>

              <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  Track Progress
                </h2>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Visualize your improvements with detailed analytics and
                  charts. See how far you've come.
                </p>
              </div>

              <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-slate-600 group-hover:bg-cyan-400 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
                <svg
                  className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
