import { useBearStore } from '../hooks/useBearStore';
import { DashboardScreen } from '../screens/DashboardScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';

export const Auth = () => {
  const user = useBearStore((state) => state.user);

  if (!user) {
    return <WelcomeScreen />;
  }

  return <DashboardScreen />;
};
