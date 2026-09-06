import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  ShieldCheck,
  AlertTriangle,
  Info,
  Search,
  ScanLine,
} from "lucide-react";

function IngredientAnalysis() {
  const navigate = useNavigate();

  // Real ingredient data will come from the backend / AI later.
  // Keep empty for a new user.
  const ingredients = [];

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-4 transition"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <p className="text-sm font-semibold text-teal-700 tracking-wide mb-2">
            AI-POWERED ANALYSIS
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Ingredient Intelligence
          </h1>

          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Understand ingredients, their purpose, potential concerns,
            and allergen information from your product package.
          </p>
        </div>

        <button
          onClick={() => navigate("/scan-product")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition shadow-sm"
        >
          <ScanLine size={18} />
          Analyze Product
        </button>
      </div>

      {/* Empty State */}
      {ingredients.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Top Section */}
          <div className="px-6 md:px-10 py-8 border-b border-slate-200">
            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                <Leaf size={24} className="text-teal-700" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  No ingredient analysis yet
                </h2>

                <p className="text-sm text-slate-500 mt-2 leading-6 max-w-2xl">
                  Scan a packaged product to extract and analyze its
                  ingredient list using PackSure AI.
                </p>
              </div>

            </div>
          </div>

          {/* Analysis Features */}
          <div className="p-6 md:p-10">

            <div className="mb-6">
              <h3 className="text-base font-semibold text-slate-900">
                What PackSure AI analyzes
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Each ingredient will be evaluated and presented in a
                clear compliance-focused format.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <AnalysisCard
                icon={<Search size={20} />}
                title="Ingredient Identification"
                description="Extract and identify ingredients from the package label."
              />

              <AnalysisCard
                icon={<Info size={20} />}
                title="Purpose & Function"
                description="Understand the role or purpose of each ingredient."
              />

              <AnalysisCard
                icon={<AlertTriangle size={20} />}
                title="Potential Concerns"
                description="Highlight ingredients that may require additional attention."
              />

              <AnalysisCard
                icon={<ShieldCheck size={20} />}
                title="Allergen Detection"
                description="Identify declared or detected allergens in the ingredient list."
              />

            </div>

            {/* CTA */}
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Ready to analyze a product?
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Upload the package image and let PackSure AI analyze
                  the ingredients.
                </p>
              </div>

              <button
                onClick={() => navigate("/scan-product")}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition"
              >
                <ScanLine size={17} />
                Scan Product
              </button>

            </div>

          </div>
        </div>
      ) : (
        <IngredientResults ingredients={ingredients} />
      )}
    </div>
  );
}


/* Analysis Feature Card */
function AnalysisCard({ icon, title, description }) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white hover:border-slate-300 transition">

      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-teal-700">
        {icon}
      </div>

      <h3 className="text-sm font-semibold text-slate-900 mt-4">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-2 leading-6">
        {description}
      </p>

    </div>
  );
}


/* Future Real Ingredient Results */
function IngredientResults({ ingredients }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      {/* Section Header */}
      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">
          Ingredient Analysis Results
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          AI-generated ingredient intelligence
        </p>
      </div>

      {/* Ingredients */}
      <div className="divide-y divide-slate-100">

        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="p-6"
          >

            <div className="flex items-start justify-between gap-5">

              <div>
                <h3 className="font-semibold text-slate-900">
                  {ingredient.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {ingredient.purpose}
                </p>
              </div>

              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {ingredient.status}
              </span>

            </div>

            <p className="text-sm text-slate-600 mt-4 leading-6">
              {ingredient.details}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}


export default IngredientAnalysis;