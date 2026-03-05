import { createBrowserRouter, Navigate } from 'react-router';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { NewCard } from './pages/NewCard';
import { CreateCard } from './pages/CreateCard';
import { CardSuccess } from './pages/CardSuccess';
import { Analytics } from './pages/Analytics';
import { NotFound } from './pages/NotFound';
import { CardView } from './pages/CardView';
import { PublicCardView } from './pages/PublicCardView';
import { useApp } from './context/AppContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Only Route (redirect to dashboard if logged in)
const PublicOnlyRoute = ({ children }) => {
  const { user } = useApp();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
{
  path: '/',
  element: <Landing />
},
{
  path: '/login',
  element:
  <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>

},
{
  path: '/signup',
  element:
  <PublicOnlyRoute>
        <Signup />
      </PublicOnlyRoute>

},
{
  path: '/dashboard',
  element:
  <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>

},
{
  path: '/new-card',
  element:
  <ProtectedRoute>
        <NewCard />
      </ProtectedRoute>

},
{
  path: '/create-card/:type',
  element:
  <ProtectedRoute>
        <CreateCard />
      </ProtectedRoute>

},
{
  path: '/card-created',
  element:
  <ProtectedRoute>
        <CardSuccess />
      </ProtectedRoute>

},
{
  path: '/card-success/:cardId',
  element:
  <ProtectedRoute>
        <CardSuccess />
      </ProtectedRoute>

},
{
  path: '/analytics',
  element:
  <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>

},
{
  path: '/card/:cardId',
  element: <CardView />
},
{
  path: '/vehicle-card/:cardId',
  element: <PublicCardView />
},
{
  path: '/business-card/:cardId',
  element: <PublicCardView />
},
{
  path: '/brand-card/:cardId',
  element: <PublicCardView />
},
{
  path: '*',
  element: <NotFound />
}]
);