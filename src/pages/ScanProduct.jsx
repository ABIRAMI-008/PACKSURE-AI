import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Image as ImageIcon,
  FileImage,
  X,
  ArrowLeft,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

function ScanProduct() {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10 MB.");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    /*
      For now we pass the uploaded image to the result page.

      Later this function will call:
      Backend → OCR → AI → Compliance Engine → Database
    */

    const imageUrl = URL.createObjectURL(selectedImage);

    navigate("/scan-result", {
      state: {
        imageUrl,
        fileName: selectedImage.name,
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-5"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
            <ScanLine size={22} className="text-teal-700" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Scan Product
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Upload a package image to begin compliance analysis.
            </p>
          </div>

        </div>
      </div>

      {/* Upload Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-7 py-6 border-b border-slate-200">

          <h2 className="text-lg font-semibold text-slate-900">
            Product Package Image
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Upload a clear image of the product packaging.
          </p>

        </div>

        <div className="p-7">

          {!preview ? (

            <label
              htmlFor="product-image"
              className="group block border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-teal-500 hover:bg-teal-50/30 transition"
            >

              <input
                id="product-image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 group-hover:bg-teal-100 flex items-center justify-center transition">

                <Upload
                  size={28}
                  className="text-slate-500 group-hover:text-teal-700"
                />

              </div>

              <h3 className="mt-5 text-base font-semibold text-slate-900">
                Upload product image
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Click to browse and select a package image
              </p>

              <p className="mt-4 text-xs text-slate-400">
                PNG, JPG or WEBP • Maximum 10 MB
              </p>

            </label>

          ) : (

            <div className="grid lg:grid-cols-[1fr_320px] gap-7">

              {/* Image Preview */}
              <div className="relative bg-slate-100 rounded-xl border border-slate-200 overflow-hidden min-h-[400px] flex items-center justify-center">

                <img
                  src={preview}
                  alt="Uploaded product"
                  className="max-h-[520px] max-w-full object-contain"
                />

                <button
                  onClick={removeImage}
                  className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-red-600 transition"
                  title="Remove image"
                >
                  <X size={18} />
                </button>

              </div>

              {/* File Details */}
              <div className="border border-slate-200 rounded-xl p-6 h-fit">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                    <FileImage
                      size={20}
                      className="text-teal-700"
                    />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {selectedImage?.name}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {(selectedImage?.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                  </div>

                </div>

                <div className="space-y-4">

                  <div className="flex items-start gap-3">

                    <ShieldCheck
                      size={18}
                      className="text-teal-700 mt-0.5"
                    />

                    <div>

                      <p className="text-sm font-medium text-slate-800">
                        Compliance Analysis
                      </p>

                      <p className="text-xs text-slate-500 mt-1 leading-5">
                        The uploaded package will be processed to extract
                        packaging information and verify compliance.
                      </p>

                    </div>

                  </div>

                  <div className="pt-4 border-t border-slate-200">

                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                      Information to be analyzed
                    </p>

                    <div className="space-y-2 text-sm text-slate-600">
                      <p>• Product name & brand</p>
                      <p>• MRP & net quantity</p>
                      <p>• Manufacturing & expiry dates</p>
                      <p>• Batch / lot number</p>
                      <p>• Ingredients & allergens</p>
                      <p>• Manufacturer declarations</p>
                    </div>

                  </div>

                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full mt-7 h-12 rounded-lg bg-teal-700 text-white font-semibold hover:bg-teal-800 disabled:opacity-70 transition flex items-center justify-center gap-2 shadow-sm"
                >

                  <ScanLine size={18} />

                  {isAnalyzing
                    ? "Preparing Analysis..."
                    : "Analyze Package"}

                </button>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* Information */}
      <div className="mt-6 flex items-start gap-3 p-5 bg-slate-50 border border-slate-200 rounded-xl">

        <ImageIcon
          size={18}
          className="text-slate-500 mt-0.5"
        />

        <div>

          <p className="text-sm font-medium text-slate-700">
            For best results
          </p>

          <p className="text-sm text-slate-500 mt-1 leading-6">
            Use a clear, well-lit image where the packaging text is
            readable. Include the front and relevant information panels
            whenever possible.
          </p>

        </div>

      </div>

    </div>
  );
}

export default ScanProduct;