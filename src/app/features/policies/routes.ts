import { Route } from "@angular/router";

export default [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./policies.component')
      .then((m) => m.PoliciesComponent),
  },
  {
    path: 'terms-of-use',
    loadComponent: () => import('./terms-of-use/terms-of-use.component')
      .then((m) => m.TermsOfUseComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component')
      .then((m) => m.PrivacyPolicyComponent),
  },
] satisfies Route[];