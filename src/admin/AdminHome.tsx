export default function AdminDashboardHome() {
  return (
    <div className="p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl text-white font-bold mb-4">Welcome, Admin!</h1>
      <p className="mb-4 text-gray-200">
        This is your dashboard. Here you can manage workouts, view users, and monitor progress.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow">
          <h2 className="text-xl font-bold">Total Workouts</h2>
          <p className="text-3xl mt-2">21</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl text-white shadow">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-3xl mt-2">5</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white shadow">
          <h2 className="text-xl font-bold">Active Sessions</h2>
          <p className="text-3xl mt-2">12</p>
        </div>
      </div>
    </div>
  );
}
