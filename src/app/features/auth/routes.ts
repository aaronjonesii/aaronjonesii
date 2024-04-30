import { Route } from "@angular/router";

export const auth_nav_path = {
  auth: '/auth',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  forgotPassword: '/auth/forgot-password',
};

export default [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./views/forgot-password/forgot-password.component')
      .then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./views/sign-in/sign-in.component')
      .then((m) => m.SignInComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./views/sign-up/sign-up.component')
      .then((m) => m.SignUpComponent),
  },
] satisfies Route[];