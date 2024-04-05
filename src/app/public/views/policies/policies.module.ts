import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesComponent } from './policies.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { MatListModule } from "@angular/material/list";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MatDividerModule } from "@angular/material/divider";

const ANGULAR_MATERIALS = [MatIconModule, MatListModule, MatDividerModule];

const CORE_MODULES  = [CommonModule];

const COMPONENTS = []!;

export const policies_nav_path = {
  termsOfUse: '/policies/terms-of-use',
  privacyPolicy: '/policies/privacy-policy'
};

const routes: Routes = [
  { path: '', component: PoliciesComponent, pathMatch: 'full' },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIALS],
  exports: [...COMPONENTS]
})
export class PoliciesModule { }
