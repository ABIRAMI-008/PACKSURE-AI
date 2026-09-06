import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ScanProduct from "./pages/ScanProduct";
import ScanResult from "./pages/ScanResult";
import IngredientAnalysis from "./pages/IngredientAnalysis";
import VisualEvidence from "./pages/VisualEvidence";
import QRVerification from "./pages/QRVerification";
import History from "./pages/History";
import Reports from "./pages/Reports";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        {/* Scan Product */}
        <Route
          path="/scan-product"
          element={
            <DashboardLayout>
              <ScanProduct />
            </DashboardLayout>
          }
        />
        <Route
        path="/scan-result"
         element={
         <DashboardLayout>
           <ScanResult />
         </DashboardLayout>
        }
         />
         <Route
          path="/ingredient-analysis"
          element={
          <DashboardLayout>
          <IngredientAnalysis />
           </DashboardLayout>
          }
        />
        <Route
        path="/visual-evidence"
        element={
         <DashboardLayout>
         <VisualEvidence />
         </DashboardLayout>
          }
        />
        <Route
        path="/qr-verification"
        element={
        <DashboardLayout>
        <QRVerification />
        </DashboardLayout>
        }
       />
       <Route
       path="/history"
       element={
        <DashboardLayout>
        <History />
       </DashboardLayout>
       }
      />
      <Route
      path="/reports"
      element={
       <DashboardLayout>
        <Reports />
       </DashboardLayout>
      }
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;