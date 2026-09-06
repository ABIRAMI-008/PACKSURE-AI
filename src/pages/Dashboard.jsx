import { useNavigate } from "react-router-dom";
import {
  ScanLine,
  PackageSearch,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  ArrowRight,
  ClipboardCheck,
  Leaf,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  // Real inspection data will be connected here later.
  // For a new user, there are no inspections.
  const inspections = [];

  // These values are calculated from actual inspections.
  const productsScanned = inspections.length;

  const compliantProducts = inspections.filter(
    (item) => item.status === "Compliant"
  ).length;

  const issuesDetected = inspections.filter(
    (item) =>
      item.status === "Non-Compliant" ||
      item.status === "Requires Verification"
  ).length;

  const averageScore =
    inspections.length > 0
      ? Math.round(
          inspections.reduce(
            (total, item) => total + item.score,
            0
          ) / inspections.length
        )
      : null;

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <p className="text-sm font-medium text-teal-700 mb-2">
            COMPLIANCE OVERVIEW
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Monitor your packaging inspections and compliance activity.
          </p>
        </div>

        <button
          onClick={() => navigate("/scan-product")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition shadow-sm"
        >
          <ScanLine size={18} />
          Scan Product
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          icon={<PackageSearch size={20} />}
          label="Products Scanned"
          value={productsScanned}
        />

        <StatCard
          icon={<CheckCircle2 size={20} />}
          label="Compliant Products"
          value={compliantProducts}
        />

        <StatCard
          icon={<AlertTriangle size={20} />}
          label="Issues Detected"
          value={issuesDetected}
        />

        <StatCard
          icon={<BarChart3 size={20} />}
          label="Average Score"
          value={averageScore !== null ? `${averageScore}%` : "—"}
        />

      </div>

      {/* Main Content */}
      <div className="grid xl:grid-cols-3 gap-6">

        {/* Recent Inspections */}
        <section className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm">

          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent Inspections
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Your latest packaging compliance reports
              </p>
            </div>

            {inspections.length > 0 && (
              <button
                onClick={() => navigate("/history")}
                className="text-sm font-medium text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                View all
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          {inspections.length === 0 ? (
            <EmptyInspectionState
              onScan={() => navigate("/scan-product")}
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {inspections.map((inspection) => (
                <InspectionRow
                  key={inspection.id}
                  inspection={inspection}
                />
              ))}
            </div>
          )}

        </section>

        {/* Ingredient Intelligence */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                <Leaf size={20} className="text-teal-700" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Ingredient Intelligence
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Ingredient & allergen analysis
                </p>
              </div>

            </div>
          </div>

          <div className="p-6">

            {inspections.length === 0 ? (
              <div className="text-center py-10">

                <div className="w-14 h-14 mx-auto rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <Leaf size={24} className="text-slate-400" />
                </div>

                <h3 className="mt-5 text-sm font-semibold text-slate-800">
                  No analysis available
                </h3>

                <p className="mt-2 text-sm text-slate-500 leading-6">
                  Scan a product to analyze its ingredients,
                  allergens and potential concerns.
                </p>

                <button
                  onClick={() => navigate("/scan-product")}
                  className="mt-5 text-sm font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
                >
                  Analyze a product
                  <ArrowRight size={15} />
                </button>

              </div>
            ) : (
              <div>
                {/* Real ingredient statistics will appear here */}
              </div>
            )}

          </div>
        </section>

      </div>

      {/* Getting Started */}
      {inspections.length === 0 && (
        <section className="mt-6 bg-slate-950 rounded-2xl p-7 md:p-8 text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                <ClipboardCheck size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Start your first compliance inspection
                </h2>

                <p className="text-sm text-slate-400 mt-2 max-w-xl leading-6">
                  Upload a product package image and let PackSure AI
                  extract the packaging information, analyze ingredients,
                  verify declarations and generate a compliance report.
                </p>
              </div>

            </div>

            <button
              onClick={() => navigate("/scan-product")}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-600 transition"
            >
              Scan Your First Product
              <ArrowRight size={17} />
            </button>

          </div>

        </section>
      )}

    </div>
  );
}


/* ---------------- STAT CARD ---------------- */

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
          {icon}
        </div>

      </div>

      <p className="text-sm text-slate-500 mt-5">
        {label}
      </p>

      <p className="text-2xl font-bold text-slate-900 mt-1">
        {value}
      </p>

    </div>
  );
}


/* ---------------- EMPTY STATE ---------------- */

function EmptyInspectionState({ onScan }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">

      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
        <PackageSearch size={28} className="text-slate-400" />
      </div>

      <h3 className="mt-5 text-base font-semibold text-slate-800">
        No inspections yet
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500 leading-6">
        Your compliance reports will appear here after you
        scan and analyze a product package.
      </p>

      <button
        onClick={onScan}
        className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition"
      >
        <ScanLine size={17} />
        Scan Product
      </button>

    </div>
  );
}


/* ---------------- INSPECTION ROW ---------------- */

function InspectionRow({ inspection }) {
  return (
    <div className="px-6 py-5 flex items-center justify-between gap-5">

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-900 truncate">
          {inspection.productName}
        </h3>

        <p className="text-xs text-slate-500 mt-1">
          {inspection.brand}
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="text-right">
          <p className="text-xs text-slate-400">
            Score
          </p>

          <p className="text-sm font-bold text-slate-900">
            {inspection.score}%
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
          {inspection.status}
        </span>

      </div>

    </div>
  );
}

export default Dashboard;