import { GoogleOAuthProvider } from '@react-oauth/google';
import { Auth } from './components/Auth';
import './index.css';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Auth />
    </GoogleOAuthProvider>
  );
}
