import { useAddWOrkoutsMutation } from "@/redux/workouts";
import { useState } from "react";
;

function AddWorkout() {
  const [addWorkout] = useAddWOrkoutsMutation();
  const [form, setForm] = useState({
    level: "",
    day: "",
    set: "",
    reps: "",
    exercises: ""
  });

  const handleChange = (e:any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await addWorkout({
      level: form.level,
      day: {
        day: Number(form.day),
        set: Number(form.set),
        reps: Number(form.reps),
        excersie: [form.exercises.split(",")]
      }
    });
    setForm({ level: "", day: "", set: "", reps: "", exercises: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add Workout</h2>

        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
        >
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <input
          name="day"
          placeholder="Day number"
          value={form.day}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
        />

        <input
          name="set"
          placeholder="Sets"
          value={form.set}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
        />

        <input
          name="reps"
          placeholder="Reps"
          value={form.reps}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
        />

        <input
          name="exercises"
          placeholder="Comma separated exercises"
          value={form.exercises}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
        />

        <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
          Add Workout
        </button>
      </form>
    </div>
  );
}

export default AddWorkout;
