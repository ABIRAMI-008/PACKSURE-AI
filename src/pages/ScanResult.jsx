import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Package,
  CalendarDays,
  Scale,
  IndianRupee,
  Factory,
  Hash,
  Leaf,
  ShieldCheck,
  ScanLine,
} from "lucide-react";

function ScanResult() {
  const navigate = useNavigate();
  const location = useLocation();

  // Image and filename received from ScanProduct
  const imageUrl = location.state?.imageUrl;
  const fileName = location.state?.fileName;

  /*
    IMPORTANT:
    This will later come from the real backend/AI analysis.

    Example future structure:

    const report = {
      productName: "...",
      brand: "...",
      mrp: "...",
      netQuantity: "...",
      manufacturingDate: "...",
      expiryDate: "...",
      batchNumber: "...",
      manufacturer: "...",
      score: 92,
      status: "Compliant",
      summary: "...",
      complianceChecks: [],
      ingredients: [],
      issues: []
    };

    We are NOT using dummy values here.
  */

  const report = null;

  /* --------------------------------------------------
     NO REPORT STATE
  -------------------------------------------------- */

  if (!report) {
    return (
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <button
            onClick={() => navigate("/scan-product")}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-5"
          >
            <ArrowLeft size={17} />
            Back to Scan Product
          </button>

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
              <FileText
                size={22}
                className="text-teal-700"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Compliance Report
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Packaging compliance analysis and verification report
              </p>
            </div>

          </div>
        </div>

        {/* Uploaded Image / Empty Report */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="px-6 py-5 border-b border-slate-200">

            <div className="flex items-center justify-between gap-4">

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Analysis Report
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Results generated from the uploaded product package
                </p>
              </div>

              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                <AlertTriangle size={14} />
                Awaiting Analysis
              </span>

            </div>
          </div>

          <div className="p-7">

            {imageUrl ? (
              <div className="grid lg:grid-cols-[1fr_360px] gap-8">

                {/* Uploaded Image */}
                <div>

                  <div className="bg-slate-100 border border-slate-200 rounded-xl overflow-hidden min-h-[420px] flex items-center justify-center">

                    <img
                      src={imageUrl}
                      alt="Uploaded product package"
                      className="max-h-[560px] max-w-full object-contain"
                    />

                  </div>

                  {fileName && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                      <Package size={14} />
                      <span className="truncate">
                        {fileName}
                      </span>
                    </div>
                  )}

                </div>

                {/* Analysis Status */}
                <div className="border border-slate-200 rounded-xl p-6 h-fit">

                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                    <ShieldCheck
                      size={24}
                      className="text-teal-700"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mt-5">
                    Ready for Analysis
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    Your package image has been received. The compliance
                    report will be generated after OCR and AI analysis.
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-200">

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                      Report will include
                    </p>

                    <div className="space-y-3">

                      <ReportItem
                        icon={<Package size={16} />}
                        text="Product & brand information"
                      />

                      <ReportItem
                        icon={<IndianRupee size={16} />}
                        text="MRP & net quantity"
                      />

                      <ReportItem
                        icon={<CalendarDays size={16} />}
                        text="Manufacturing & expiry dates"
                      />

                      <ReportItem
                        icon={<Hash size={16} />}
                        text="Batch / lot information"
                      />

                      <ReportItem
                        icon={<Leaf size={16} />}
                        text="Ingredients & allergen analysis"
                      />

                      <ReportItem
                        icon={<ShieldCheck size={16} />}
                        text="Compliance comparison & score"
                      />

                    </div>

                  </div>

                  <button
                    onClick={() => navigate("/scan-product")}
                    className="w-full mt-7 h-11 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-2"
                  >
                    <ScanLine size={17} />
                    Scan Another Product
                  </button>

                </div>

              </div>
            ) : (

              /* No Image */
              <div className="py-16 text-center">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <FileText
                    size={30}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-800">
                  No Compliance Report Available
                </h3>

                <p className="mt-2 max-w-md mx-auto text-sm text-slate-500 leading-6">
                  Upload a product package image to begin the compliance
                  inspection and generate a detailed report.
                </p>

                <button
                  onClick={() => navigate("/scan-product")}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition shadow-sm"
                >
                  <ScanLine size={18} />
                  Scan Product
                </button>

              </div>
            )}

          </div>
        </div>

        {/* Information */}
        <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={18}
              className="text-teal-700 mt-0.5"
            />

            <div>

              <p className="text-sm font-medium text-slate-800">
                How the compliance analysis works
              </p>

              <p className="text-sm text-slate-500 mt-1 leading-6">
                PackSure AI will extract information from the package,
                analyze ingredients and allergens, compare declarations
                against applicable compliance requirements, and generate
                a verification score.
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }

  /* --------------------------------------------------
     REAL REPORT STATE

     This section will automatically render when
     report data comes from the backend.
  -------------------------------------------------- */

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Report Header */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <p className="text-sm font-medium text-teal-700 mb-2">
              COMPLIANCE REPORT
            </p>

            <h1 className="text-2xl font-bold text-slate-900">
              {report.productName}
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              {report.brand}
            </p>

          </div>

          <StatusBadge status={report.status} />

        </div>

      </section>

      {/* Product Information */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <SectionHeader
          icon={<Package size={19} />}
          title="Product Information"
          description="Information extracted from the product package"
        />

        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <InfoItem
            icon={<Package size={17} />}
            label="Product"
            value={report.productName}
          />

          <InfoItem
            icon={<IndianRupee size={17} />}
            label="MRP"
            value={report.mrp}
          />

          <InfoItem
            icon={<Scale size={17} />}
            label="Net Quantity"
            value={report.netQuantity}
          />

          <InfoItem
            icon={<Hash size={17} />}
            label="Batch / Lot"
            value={report.batchNumber}
          />

          <InfoItem
            icon={<CalendarDays size={17} />}
            label="Manufacturing Date"
            value={report.manufacturingDate}
          />

          <InfoItem
            icon={<CalendarDays size={17} />}
            label="Expiry / Best Before"
            value={report.expiryDate}
          />

          <InfoItem
            icon={<Factory size={17} />}
            label="Manufacturer"
            value={report.manufacturer}
          />

          <InfoItem
            icon={<Package size={17} />}
            label="Brand"
            value={report.brand}
          />

        </div>

      </section>

      {/* Compliance Overview */}
      <section className="grid lg:grid-cols-3 gap-6">

        {/* Score */}
        <div className="bg-slate-950 rounded-2xl p-7 text-white">

          <p className="text-sm text-slate-400">
            Compliance Score
          </p>

          <div className="flex items-end gap-2 mt-4">

            <span className="text-5xl font-bold">
              {report.score}
            </span>

            <span className="text-slate-400 mb-2">
              / 100
            </span>

          </div>

          <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-teal-500 rounded-full"
              style={{
                width: `${report.score}%`,
              }}
            />

          </div>

          <p className="text-sm text-slate-400 mt-4 leading-6">
            Overall packaging compliance score based on detected
            declarations and applicable requirements.
          </p>

        </div>

        {/* Verification */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">

          <p className="text-sm text-slate-500">
            Verification Status
          </p>

          <div className="mt-4">
            <StatusBadge
              status={report.status}
              large
            />
          </div>

          <p className="text-sm text-slate-500 mt-5 leading-6">
            {report.summary}
          </p>

        </div>

      </section>

      {/* Compliance Comparison */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <SectionHeader
          icon={<ShieldCheck size={19} />}
          title="Compliance Comparison"
          description="Package declarations compared with applicable requirements"
        />

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="text-left px-6 py-4 font-semibold text-slate-700">
                  Requirement
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-700">
                  Detected Information
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-700">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {report.complianceChecks.map(
                (check, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 last:border-0"
                  >

                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {check.requirement}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {check.detected}
                    </td>

                    <td className="px-6 py-4">
                      <CheckStatus status={check.status} />
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* Ingredient Intelligence */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <SectionHeader
          icon={<Leaf size={19} />}
          title="Ingredient Intelligence"
          description="Ingredient purpose, details and allergen information"
        />

        <div className="divide-y divide-slate-100">

          {report.ingredients.map(
            (ingredient, index) => (
              <div
                key={index}
                className="p-6 grid lg:grid-cols-4 gap-5"
              >

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Ingredient
                  </p>

                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {ingredient.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Purpose
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    {ingredient.purpose}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Details
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    {ingredient.details}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Allergen
                  </p>

                  <p className="text-sm font-medium text-slate-700 mt-1">
                    {ingredient.allergen}
                  </p>
                </div>

              </div>
            )
          )}

        </div>

      </section>

      {/* Issues & Violations */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <SectionHeader
          icon={<AlertTriangle size={19} />}
          title="Issues & Violations"
          description="Items requiring attention or verification"
        />

        <div className="p-6 space-y-3">

          {report.issues.map(
            (issue, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200"
              >

                <AlertTriangle
                  size={18}
                  className="text-amber-600 mt-0.5"
                />

                <p className="text-sm text-slate-700">
                  {issue}
                </p>

              </div>
            )
          )}

        </div>

      </section>

    </div>
  );
}


/* --------------------------------------------------
   SMALL COMPONENTS
-------------------------------------------------- */

function ReportItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <span className="text-teal-700">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}


function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="px-6 py-5 border-b border-slate-200">

      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
          {icon}
        </div>

        <div>

          <h2 className="text-base font-semibold text-slate-900">
            {title}
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}


function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

      <div className="flex items-center gap-2 text-slate-400">

        {icon}

        <span className="text-xs uppercase tracking-wider">
          {label}
        </span>

      </div>

      <p className="text-sm font-semibold text-slate-900 mt-3">
        {value}
      </p>

    </div>
  );
}


function StatusBadge({
  status,
  large = false,
}) {
  let styles =
    "bg-slate-100 text-slate-700 border-slate-200";

  let icon = (
    <ShieldCheck size={15} />
  );

  if (status === "Compliant") {
    styles =
      "bg-green-50 text-green-700 border-green-200";

    icon = (
      <CheckCircle2 size={15} />
    );
  }

  if (status === "Requires Verification") {
    styles =
      "bg-amber-50 text-amber-700 border-amber-200";

    icon = (
      <AlertTriangle size={15} />
    );
  }

  if (status === "Non-Compliant") {
    styles =
      "bg-red-50 text-red-700 border-red-200";

    icon = (
      <XCircle size={15} />
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 border rounded-full font-medium ${
        large
          ? "px-4 py-2 text-sm"
          : "px-3 py-1.5 text-xs"
      } ${styles}`}
    >
      {icon}
      {status}
    </span>
  );
}


function CheckStatus({ status }) {
  if (status === "Pass") {
    return (
      <span className="inline-flex items-center gap-1.5 text-green-700 font-medium">
        <CheckCircle2 size={16} />
        Pass
      </span>
    );
  }

  if (status === "Fail") {
    return (
      <span className="inline-flex items-center gap-1.5 text-red-700 font-medium">
        <XCircle size={16} />
        Fail
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-amber-700 font-medium">
      <AlertTriangle size={16} />
      Verify
    </span>
  );
}

export default ScanResult;