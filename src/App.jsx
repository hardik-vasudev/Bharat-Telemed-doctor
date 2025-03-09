// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// Lazy load pages from the src/pages folder
const HomePage = lazy(() => import("./pages/HomePage"));
const TeleConsultationPage = lazy(() => import("./pages/TeleConsultationPage"));
const SensorData = lazy(() => import("./components/SensorDataDisplay"));
const SensorDataPage = lazy(() => import("./pages/SensorDataPage"));
const PatientRecords = lazy(() => import("./pages/PatientRecords"));
const QueriesPage = lazy(() => import("./pages/QueriesPage"));
const Bookings = lazy(() => import("./pages/Bookings"));
const SupportServices = lazy(() => import("./pages/SupportServices"));
const WaitingScreen = lazy(() => import("./pages/WaitingScreen")); // New WaitingScreen route
const PrescriptionBuilder = lazy(() => import("./components/PrescriptionBuilder"));
const PrescriptionPdf = lazy(() => import("./pages/PrescriptionPdf"));
const JivanAISymptomForm = lazy(() => import("./components/JivanAI"));

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <div className="p-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/teleconsultation" element={<TeleConsultationPage />} />
                <Route path="/sensor-data" element={<SensorData />} />
                <Route path="/sensor-data-page" element={<SensorDataPage />} />
                <Route path="/waiting-screen" element={<WaitingScreen />} /> {/* New route */}
                <Route path="/patient-records" element={<PatientRecords />} />
                <Route path="/queries" element={<QueriesPage />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/support-services" element={<SupportServices />} />
                <Route path="/prescription" element={<PrescriptionBuilder />} />
                <Route path="/prescription-pdf" element={<PrescriptionPdf />} />
                <Route path="/jivanai" element={<JivanAISymptomForm />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
