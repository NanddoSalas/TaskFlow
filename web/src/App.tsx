import { GoogleOAuthProvider } from '@react-oauth/google';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { Auth } from './components/Auth';
import { useBearStore } from './hooks/useBearStore';
import './index.css';

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useBearStore);
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Auth />
    </GoogleOAuthProvider>
  );
}
