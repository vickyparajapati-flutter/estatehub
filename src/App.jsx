import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AgentsPage from './pages/AgentsPage';
import AgentProfilePage from './pages/AgentProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparePage from './pages/ComparePage';

// Dashboards
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import MyPropertiesPage from './pages/MyPropertiesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import InquiriesPage from './pages/InquiriesPage';
import { DashboardProfileView, DashboardSettingsView } from './pages/DashboardProfileSettings';

// Admin
import AdminLayout from './layouts/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminProperties from './pages/admin/AdminProperties';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAgents from './pages/admin/AdminAgents';
import { 
  AdminInquiriesView, AdminLocationsView, AdminReportsView, AdminSettingsView 
} from './pages/admin/AdminSubPages';

// Scroll to Top Helper
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Main Public Layout Wrapper
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toast />
        <Routes>
          
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/agents/:id" element={<AgentProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>

          {/* Agent / Owner Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="properties" element={<MyPropertiesPage />} />
            <Route path="properties/add" element={<AddPropertyPage />} />
            <Route path="properties/:id/edit" element={<AddPropertyPage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="leads" element={<InquiriesPage />} />
            <Route path="profile" element={<DashboardProfileView />} />
            <Route path="settings" element={<DashboardSettingsView />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="agents" element={<AdminAgents />} />
            <Route path="owners" element={<AdminUsers />} />
            <Route path="inquiries" element={<AdminInquiriesView />} />
            <Route path="locations" element={<AdminLocationsView />} />
            <Route path="reports" element={<AdminReportsView />} />
            <Route path="settings" element={<AdminSettingsView />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
