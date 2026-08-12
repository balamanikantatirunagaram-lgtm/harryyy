import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Auth from './pages/Auth';
import AcademyMap from './pages/AcademyMap';
import LessonView from './pages/LessonView';
import { useAuthStore } from './store/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuthStore();
  if (!currentUser) return <Navigate to="/auth" />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/academy" />} />
          <Route path="academy" element={<AcademyMap />} />
          <Route path="lesson/:id" element={<LessonView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
