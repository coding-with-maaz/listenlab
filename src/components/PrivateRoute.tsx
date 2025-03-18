import { Navigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '@/store/api/authApi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { data, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <LoadingSpinner centered />;
  }

  if (!data?.success || !data.data?.user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
} 