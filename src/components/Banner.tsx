import { ArrowRight, Zap } from "lucide-react";
import banner from "../assets/banner.png";
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse md-px-8 px-1 justify-between items-center md:gap-5 transition mt-3">
      <div className="hidden md:flex md:w-1/2  w-full items-center md:justify-end transition hover:scale-110 duration-300">
        <img
          src={banner}
          alt="handstand image"
          className="max-w-[80%] h-auto"
        />
      </div>
      <div className="md:w-1/2 px-5 md:px-0">
        <div className="inline-flex items-center gap-2 mb-5 px-6 py-2 bg-amber-400/20 border border-amber-400/50 rounded-full">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-amber-400">
            Transform Your Fitness
          </span>
        </div>

        <h1 className="md:text-6xl text-4xl font-bold md:mb-6 mb-3  text-gray-800 dark:bg-gradient-to-r dark:from-white dark:via-amber-100 dark:to-orange-200 bg-clip-text dark:text-transparent leading-tight">
          Calisthenics & Home Workout Tracker
        </h1>

        <p className="text-lg md:text-xl dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
          Log workouts, track nutrition, and monitor your progress with visual
          charts and photos. Everything you need to achieve your fitness goals
          in one place.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="dark:text-slate-300 text-sm">
              Real-time Tracking
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="dark:text-slate-300 text-sm">
              Visual Analytics
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="dark:text-slate-300 text-sm">Photo Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="dark:text-slate-300 text-sm">Goal Planning</span>
          </div>
        </div>

        <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-1">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full" />

          <span className="relative">Get Started</span>
          <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
