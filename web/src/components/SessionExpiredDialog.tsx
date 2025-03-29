import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useBearStore } from '../hooks/useBearStore';
import { getUserFromIdToken } from '../utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export const SessionExpiredDialog = () => {
  const isSessionExpired = useBearStore((state) => state.isSessionExpired);
  const user = useBearStore((state) => state.user);
  const login = useBearStore((state) => state.login);
  const logout = useBearStore((state) => state.logout);

  const handleLogin = ({ credential }: CredentialResponse) => {
    if (credential) {
      const user2 = getUserFromIdToken(credential);

      if (user?.email === user2.email) {
        login(credential, user2);
      } else {
        logout();
      }
    }
  };

  return (
    <AlertDialog open={isSessionExpired}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Expired</AlertDialogTitle>

          <AlertDialogDescription>
            Your session has expired! Please sign in again to continue managing
            your tasks.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <AlertDialogAction onClick={logout}>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
