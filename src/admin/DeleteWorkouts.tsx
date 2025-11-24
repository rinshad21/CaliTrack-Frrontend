import { useFetchAllWorkoutsQuery, useDeleteWorkoutsMutation } from "@/redux/workouts";
import { Trash2, Loader, AlertCircle, Zap } from "lucide-react";
import { useState } from "react";

export default function ManageWorkouts() {
  const { data: workouts, isLoading, refetch } = useFetchAllWorkoutsQuery();
  const [deleteWorkout, { isLoading: isDeleting }] = useDeleteWorkoutsMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteWorkout(id).unwrap();
      refetch();
      setDeletingId(null);
    } catch (error) {
      console.error("Delete error:", error);
      setDeletingId(null);
      alert("Failed to delete workout");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-amber-400 animate-spin mr-3" />
        <span className="text-slate-300">Loading workouts...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Manage Workouts</h1>
          <p className="text-slate-400">Total: {workouts?.length || 0} workouts</p>
        </div>

        {/* Warning */}
        <div className="mb-6 p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <p className="text-orange-300 text-sm">
            Deleting a workout is permanent and cannot be undone.
          </p>
        </div>

        {/* Workouts Table */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border border-slate-600 shadow-xl overflow-hidden">
          
          {workouts && workouts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                
                {/* Table Header */}
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-600">
                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">ID</th>
                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Level</th>
                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Day</th>
                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Sets</th>
                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Reps</th>
                    <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Exercise</th>
                    <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">Action</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {workouts.map((workout: any, index: number) => (
                    <tr
                      key={workout._id}
                      className="border-b border-slate-600/50 hover:bg-slate-700/50 transition-colors duration-300 group"
                    >
                      {/* ID */}
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-slate-400 group-hover:text-slate-300">
                          {workout._id?.substring(0, 8)}...
                        </span>
                      </td>

                      {/* Level */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          workout.level === "beginner"
                            ? "bg-amber-500/30 text-amber-400 border border-amber-500/50"
                            : workout.level === "intermediate"
                            ? "bg-cyan-500/30 text-cyan-400 border border-cyan-500/50"
                            : "bg-purple-500/30 text-purple-400 border border-purple-500/50"
                        }`}>
                          {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
                        </span>
                      </td>

                      {/* Day */}
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">Day {workout.day?.day}</span>
                      </td>

                      {/* Sets */}
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">{workout.day?.set}</span>
                      </td>

                      {/* Reps */}
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">{workout.day?.reps}</span>
                      </td>

                      {/* Exercise */}
                      <td className="px-6 py-4">
                        <span className="text-slate-300 text-sm">
                          {workout.day?.excersie?.[0] || "N/A"}
                        </span>
                      </td>

                      {/* Delete Button */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(workout._id)}
                          disabled={deletingId === workout._id}
                          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all duration-300 ${
                            deletingId === workout._id
                              ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 hover:shadow-lg hover:shadow-red-500/50 hover:scale-105"
                          }`}
                        >
                          {deletingId === workout._id ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Zap className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400">No workouts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}