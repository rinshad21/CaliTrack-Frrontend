import { useFetchAllWorkoutsQuery } from "@/redux/workouts";
import { Loader, Dumbbell, TrendingUp, Zap, Calendar, Repeat2 } from "lucide-react";

const WorkoutLevels = () => {
  const { data, isLoading } = useFetchAllWorkoutsQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-amber-400 animate-spin" />
        <span className="ml-3 text-slate-300">Loading workouts...</span>
      </div>
    );

  const beginner = data?.filter((w: any) => w.level === "beginner");
  const intermediate = data?.filter((w: any) => w.level === "intermediate");
  const advanced = data?.filter((w: any) => w.level === "advanced");

  const renderWorkout = (w: any) => {
    const exercises = w.day?.excersie?.flat() || [];
    return (
      <div
        key={w._id}
        className="p-4 mb-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-300 group shadow-lg hover:shadow-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <p className="font-bold text-white">Day {w.day?.day}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4 pb-4 border-b border-slate-600/50">
          <div className="flex items-center gap-2 text-sm">
            <Repeat2 className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">
              <span className="font-semibold text-white">{w.day?.set}</span> Sets
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Dumbbell className="w-4 h-4 text-orange-400" />
            <span className="text-slate-300">
              <span className="font-semibold text-white">{w.day?.reps}</span> Reps
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Exercises
          </p>
          {exercises.length > 0 ? (
            exercises.map((ex: any, i: any) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 bg-slate-600/50 rounded text-sm text-slate-200 hover:text-white hover:bg-slate-600 transition-colors group/item"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                <span>{ex}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">No exercises listed</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Workout Levels</h1>
          <p className="text-slate-400">Choose your difficulty and start training</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Beginner Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Beginner</h2>
                <p className="text-sm text-slate-400">
                  {beginner?.length || 0} workouts
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {beginner && beginner.length > 0 ? (
                beginner.map(renderWorkout)
              ) : (
                <div className="p-6 bg-slate-700/50 rounded-lg border border-slate-600 text-center">
                  <p className="text-slate-400 text-sm">No workouts available</p>
                </div>
              )}
            </div>
          </div>

          {/* Intermediate Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-900">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Intermediate</h2>
                <p className="text-sm text-slate-400">
                  {intermediate?.length || 0} workouts
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {intermediate && intermediate.length > 0 ? (
                intermediate.map(renderWorkout)
              ) : (
                <div className="p-6 bg-slate-700/50 rounded-lg border border-slate-600 text-center">
                  <p className="text-slate-400 text-sm">No workouts available</p>
                </div>
              )}
            </div>
          </div>

          {/* Advanced Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-slate-900">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Advanced</h2>
                <p className="text-sm text-slate-400">
                  {advanced?.length || 0} workouts
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {advanced && advanced.length > 0 ? (
                advanced.map(renderWorkout)
              ) : (
                <div className="p-6 bg-slate-700/50 rounded-lg border border-slate-600 text-center">
                  <p className="text-slate-400 text-sm">No workouts available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLevels;