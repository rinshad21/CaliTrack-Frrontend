import { useFetchAllWorkoutsQuery, useUpdateWorkoutsMutation } from "@/redux/workouts";
import { handleError, handleSuccess } from "@/utils/Toastify";
import { Loader, AlertCircle, Edit2, Check, X, Zap, Bell } from "lucide-react";
import { useState, useCallback } from "react";

export default function UpdateWorkouts() {
  const { data: workouts, isLoading, refetch } = useFetchAllWorkoutsQuery();
  const [updateWorkout, { isLoading: isUpdating }] = useUpdateWorkoutsMutation();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  

  const [formData, setFormData] = useState({
    day: "", 
    set: "",
    reps: "", 
    excersie: "", 
  });


  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | null }>({
    message: "",
    type: null,
  });

  // Function to show notifications
  const showNotification = useCallback((message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: null });
    }, 4000);
  }, []);

  const handleEdit = (workout: any) => {
    setEditingId(workout._id);
    // Populate formData with existing values, converting numbers to strings for inputs
    setFormData({
      day: String(workout.day?.day || ""),
      set: String(workout.day?.set || ""),
      reps: String(workout.day?.reps || ""),
      excersie: workout.day?.excersie?.[0] || "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleUpdate = async (id: string) => {
    const dayValue = formData.day.trim();
    const setValue = formData.set.trim();
    const repsValue = formData.reps.trim();

    if (!dayValue || !setValue || !repsValue) {
      showNotification("Day, Sets, and Reps are mandatory fields. All three must be entered.", "error");
      return;
    }

   
    const updatePayload = {
      day: {
        day: parseInt(dayValue, 10),
        set: parseInt(setValue, 10),
        reps: parseInt(repsValue, 10),
        // Sen excersie as an array, using the current value (or empty array)
        excersie: formData.excersie.trim() ? [formData.excersie.trim()] : [],
      },
    };
    
    try {
      await updateWorkout({ id, data: updatePayload }).unwrap();
      setEditingId(null);
      setFormData({ day: "", set: "", reps: "", excersie: "" });
      refetch();
        handleSuccess("Workout updated successfully!");
    } catch (error: any) {
      console.error("Update error:", error);
      const errorMessage = error?.data?.message || "Failed to update workout";
      handleError(errorMessage);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ day: "", set: "", reps: "", excersie: "" });
  };

  // Notification Component (inline, simple)
  const Notification = () => {
    if (!notification.message) return null;

    const baseClasses = "fixed bottom-4 right-4 p-4 rounded-lg shadow-xl flex items-center gap-3 z-50 transition-all duration-300 transform";
    const successClasses = "bg-green-600 border-green-700 text-white";
    const errorClasses = "bg-red-600 border-red-700 text-white";

    return (
      <div className={`${baseClasses} ${notification.type === "success" ? successClasses : errorClasses}`}>
        <Bell className="w-5 h-5" />
        <p className="font-semibold">{notification.message}</p>
      </div>
    );
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Update Workouts</h1>
          <p className="text-slate-400">Edit workout details according to the required schema.</p>
        </div>

        {/* Info */}
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm font-semibold">
            CRITICAL: Day, Sets, and Reps are MANDATORY fields when updating. You must re-enter or update these three values to satisfy the server's nested schema validation.
          </p>
        </div>

        {/* Workouts Grid */}
        <div className="space-y-4">
          {workouts && workouts.length > 0 ? (
            workouts.map((workout: any) => (
              <div
                key={workout._id}
                className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600 shadow-lg hover:border-slate-500 transition-all duration-300 p-6"
              >
                
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-600/50">
                  <div className="flex items-center gap-4">
                    {/* Level Badge */}
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        workout.level === "beginner"
                          ? "bg-amber-500/30 text-amber-400 border border-amber-500/50"
                          : workout.level === "intermediate"
                          ? "bg-cyan-500/30 text-cyan-400 border border-cyan-500/50"
                          : "bg-purple-500/30 text-purple-400 border border-purple-500/50"
                      }`}
                    >
                      {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
                    </span>

                    {/* Workout ID */}
                    <span className="text-xs font-mono text-slate-400">
                      ID: {workout._id?.substring(0, 12)}...
                    </span>
                  </div>

                  {/* Edit/Cancel Buttons */}
                  {editingId === workout._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(workout._id)}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2 hover:shadow-lg disabled:opacity-50"
                      >
                        {isUpdating ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(workout)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/50"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>

                {/* Content Row */}
                {editingId === workout._id ? (
                  // Edit Form
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Day *
                      </label>
                      <input
                        type="number"
                        value={formData.day}
                        onChange={(e) => handleInputChange(e, "day")}
                        min="1"
                        max="7"
                        placeholder="Required"
                        required
                        className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Sets *
                      </label>
                      <input
                        type="number"
                        value={formData.set}
                        onChange={(e) => handleInputChange(e, "set")}
                        min="1"
                        placeholder="Required"
                        required
                        className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Reps *
                      </label>
                      <input
                        type="number"
                        value={formData.reps}
                        onChange={(e) => handleInputChange(e, "reps")}
                        min="1"
                        placeholder="Required"
                        required
                        className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Exercise (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.excersie}
                        onChange={(e) => handleInputChange(e, "excersie")}
                        placeholder="e.g., Push-ups"
                        className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                ) : (
                  // Display View
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Day
                      </p>
                      <p className="text-2xl font-bold text-white">{workout.day?.day}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Sets
                      </p>
                      <p className="text-2xl font-bold text-amber-400">{workout.day?.set}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Reps
                      </p>
                      <p className="text-2xl font-bold text-cyan-400">{workout.day?.reps}</p>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Exercise
                      </p>
                      <p className="text-white font-semibold">
                        {workout.day?.excersie?.[0] || "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600">
              <Zap className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400">No workouts found</p>
            </div>
          )}
        </div>
      </div>
      <Notification />
    </div>
  );
}