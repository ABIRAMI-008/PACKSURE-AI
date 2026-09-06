import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  QrCode,
  ScanLine,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

function QRVerification() {
  const navigate = useNavigate();

  // Real QR verification data will come from the backend later.
  const verification = null;

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
            PRODUCT VERIFICATION
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            QR Verification
          </h1>

          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Verify product information and access digital details through
            the QR code printed on the package.
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

      {/* Main Card */}
      {!verification ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* QR Scanner Area */}
          <section className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-900">
                QR Code Scanner
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Position the product QR code inside the scanning area.
              </p>
            </div>

            <div className="p-6 md:p-10">

              <div className="max-w-lg mx-auto">

                {/* Scanner Box */}
                <div className="aspect-square max-w-sm mx-auto rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center relative">

                  {/* Scanner Corners */}
                  <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-teal-600 rounded-tl-lg" />
                  <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2 border-teal-600 rounded-tr-lg" />
                  <div className="absolute bottom-6 left-6 w-10 h-10 border-l-2 border-b-2 border-teal-600 rounded-bl-lg" />
                  <div className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-teal-600 rounded-br-lg" />

                  <div className="text-center">

                    <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                      <QrCode size={42} className="text-teal-700" />
                    </div>

                    <h3 className="mt-5 text-sm font-semibold text-slate-800">
                      Ready to scan
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 max-w-xs leading-6">
                      Your camera or QR image can be used here once
                      the verification service is connected.
                    </p>

                  </div>
                </div>

                {/* Scanner Button */}
                <button
                  type="button"
                  className="w-full mt-6 h-12 rounded-lg border border-slate-300 bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                  <QrCode size={18} />
                  Start QR Scanner
                </button>

              </div>
            </div>
          </section>

          {/* Information */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-200">
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-teal-700" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    QR Verification
                  </h2>

                  <p className="text-xs text-slate-500 mt-1">
                    Digital product verification
                  </p>
                </div>

              </div>
            </div>

            <div className="p-6">

              <div className="space-y-5">

                <VerificationInfo
                  icon={<QrCode size={19} />}
                  title="Scan QR Code"
                  description="Capture the QR code printed on the product package."
                />

                <VerificationInfo
                  icon={<ShieldCheck size={19} />}
                  title="Verify Information"
                  description="Compare QR-linked information with the inspected package data."
                />

                <VerificationInfo
                  icon={<AlertTriangle size={19} />}
                  title="Identify Discrepancies"
                  description="Flag differences or information that requires verification."
                />

                <VerificationInfo
                  icon={<CheckCircle2 size={19} />}
                  title="Verification Result"
                  description="Display the final verification status when analysis is complete."
                />

              </div>

              {/* Notice */}
              <div className="mt-7 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">

                <Info
                  size={18}
                  className="text-slate-500 mt-0.5 shrink-0"
                />

                <p className="text-xs text-slate-500 leading-5">
                  QR verification will become active after the scanning
                  and verification service is connected.
                </p>

              </div>

            </div>
          </section>
        </div>
      ) : (
        <VerificationResult verification={verification} />
      )}
    </div>
  );
}


/* Verification Information */
function VerificationInfo({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3">

      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-teal-700 shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mt-1 leading-5">
          {description}
        </p>
      </div>

    </div>
  );
}


/* Future Real Verification Result */
function VerificationResult({ verification }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">
          Verification Result
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          QR verification details
        </p>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3">

          <CheckCircle2
            size={24}
            className="text-green-600"
          />

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {verification.status}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {verification.message}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default QRVerification;