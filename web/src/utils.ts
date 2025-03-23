import * as jose from 'jose';
import { User } from './types';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const getUserFromIdToken = (idToken: string) => {
  const claims = jose.decodeJwt(idToken);
  const user: User = { name: '', email: '', picture: '' };

  if ('name' in claims) user.name = claims['name'] as string;
  if ('email' in claims) user.email = claims['email'] as string;
  if ('picture' in claims) user.picture = claims['picture'] as string;

  return user;
};
