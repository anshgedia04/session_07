import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import CategoryList from './pages/admin/CategoryList';
import BlogList from './pages/admin/BlogList';
import BlogForm from './pages/admin/BlogForm';
import Home from './pages/public/Home';
import BlogDetails from './pages/public/BlogDetails';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogDetails /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/categories" element={
            <ProtectedRoute>
              <AdminLayout>
                <CategoryList />
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/blogs" element={
            <ProtectedRoute>
              <AdminLayout>
                <BlogList />
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/blogs/new" element={
            <ProtectedRoute>
              <AdminLayout>
                <BlogForm />
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/blogs/edit/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <BlogForm />
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
