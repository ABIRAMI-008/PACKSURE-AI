import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ScanLine,
  Image as ImageIcon,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

function VisualEvidence() {
  const navigate = useNavigate();

  // Real evidence will come from the scan result/backend later.
  const imageUrl = null;
  const evidence = [];

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
            VISUAL INSPECTION
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Visual Evidence
          </h1>

          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Review the package image and visual evidence identified during
            the compliance inspection.
          </p>
        </div>

        <button
          onClick={() => navigate("/scan-product")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition shadow-sm"
        >
          <ScanLine size={18} />
          New Inspection
        </button>
      </div>

      {/* No Image */}
      {!imageUrl ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="px-6 md:px-10 py-8 border-b border-slate-200">
            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                <ImageIcon size={24} className="text-slate-500" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  No visual evidence available
                </h2>

                <p className="text-sm text-slate-500 mt-2 leading-6 max-w-2xl">
                  Scan a product package to capture visual evidence and
                  identify important packaging information.
                </p>
              </div>

            </div>
          </div>

          {/* What will be checked */}
          <div className="p-6 md:p-10">

            <div className="mb-6">
              <h3 className="text-base font-semibold text-slate-900">
                What visual inspection covers
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                PackSure AI can identify and provide evidence for important
                packaging declarations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <EvidenceCard
                icon={<Search size={20} />}
                title="Package Information"
                description="Locate important product declarations and packaging details."
              />

              <EvidenceCard
                icon={<CheckCircle2 size={20} />}
                title="Declaration Verification"
                description="Verify whether required declarations are visible on the package."
              />

              <EvidenceCard
                icon={<AlertTriangle size={20} />}
                title="Potential Issues"
                description="Highlight visible information that may require verification."
              />

              <EvidenceCard
                icon={<Info size={20} />}
                title="Evidence References"
                description="Connect compliance findings with their visual location on the package."
              />

            </div>

            {/* CTA */}
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Start a visual inspection
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Upload a package image to generate visual evidence.
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
        <VisualEvidenceResults
          imageUrl={imageUrl}
          evidence={evidence}
        />
      )}
    </div>
  );
}


/* Evidence Card */
function EvidenceCard({ icon, title, description }) {
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


/* Future Real Evidence Results */
function VisualEvidenceResults({ imageUrl, evidence }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* Package Image */}
      <section className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">
            Package Evidence
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Visual reference from the inspected package
          </p>
        </div>

        <div className="p-6 bg-slate-50">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <img
              src={imageUrl}
              alt="Inspected package"
              className="w-full max-h-[650px] object-contain"
            />
          </div>
        </div>

      </section>

      {/* Evidence List */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">
            Detected Evidence
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            AI-detected visual findings
          </p>
        </div>

        <div className="p-6">

          {evidence.length === 0 ? (
            <div className="text-center py-10">

              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <Search size={22} className="text-slate-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                No evidence detected
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-6">
                Visual findings will appear here after the package
                is analyzed.
              </p>

            </div>
          ) : (
            <div className="space-y-4">

              {evidence.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {item.status}
                    </span>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default VisualEvidence;