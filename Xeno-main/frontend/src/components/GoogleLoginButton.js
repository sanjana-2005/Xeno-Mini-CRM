import { GoogleLogin } from '@react-oauth/google';

export default function GoogleLoginButton({ onLogin }) {
  return (
    <GoogleLogin
      onSuccess={(response) => {
        const user = {
          name: response.profileObj?.name || 'User',
          email: response.profileObj?.email,
        };
        onLogin(user); // ✅ triggers HomePage redirect
      }}
      onError={() => {
        alert('Google Login failed');
      }}
    />
  );
}
