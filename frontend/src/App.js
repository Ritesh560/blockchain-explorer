import { QueryClient, QueryClientProvider } from 'react-query';
import styles from './App.module.scss';
import RoleRoutes from './rbac/RoleRoutes';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <RoleRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
