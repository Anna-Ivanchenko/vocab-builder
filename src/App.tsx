import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';

const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const DictionaryPage = lazy(() => import('./pages/DictionaryPage/DictionaryPage'))
const RecommendPage = lazy(() => import('./pages/RecommendPage/RecommendPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage/TrainingPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/register"
          element={<RestrictedRoute><RegisterPage /></RestrictedRoute>}
        />
        <Route
          path="/login"
          element={<RestrictedRoute><LoginPage /></RestrictedRoute>}
        />

        <Route
          path="/"
          element={<PrivateRoute><SharedLayout /></PrivateRoute>}
        >
          <Route index element={<Navigate to="/dictionary" replace />} />
          <Route path="dictionary" element={<DictionaryPage />} />
          <Route path="recommend" element={<RecommendPage />} />
          <Route path="training" element={<TrainingPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;