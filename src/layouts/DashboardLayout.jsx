import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="lg:ml-64 min-h-screen">

        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-8 sticky top-0 z-30">

          {/* Search */}
          <div className="hidden md:flex items-center w-72 h-10 bg-slate-50 border border-slate-200 rounded-lg px-3">
            <Search size={17} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full ml-2 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">

            {/* Notification */}
            <button className="relative w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition">
              <Bell size={19} />

              <span className="absolute top-2 right-2 w-2 h-2 bg-teal-600 rounded-full border-2 border-white" />
            </button>

            {/* Profile */}
            <button className="flex items-center gap-3 pl-3 border-l border-slate-200">

              <div className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-semibold">
                A
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-800">
                  User
                </p>

                <p className="text-xs text-slate-400">
                  User
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden sm:block text-slate-400"
              />

            </button>

          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;