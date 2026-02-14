function Dashboard() {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        Sidebar
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow">
            Total Events
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            Registered
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            Upcoming
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
