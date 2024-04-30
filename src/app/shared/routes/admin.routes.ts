const admin_projects_nav_path = {
  adminProjects: '/admin/projects',
  adminAddProject: '/admin/projects/add',
  adminEditProject: (id: string) => `/admin/projects/${id}/edit`,
};

const admin_users_nav_path = {
  adminUsers: '/admin/users',
  adminUserDetail: (id: string) => `/admin/users/${id}`,
};

export const admin_nav_path = {
  admin: '/admin',
  adminDashboard: '/admin/dashboard',
  ...admin_projects_nav_path,
  adminFileManager: '/admin/file-manager',
  ...admin_users_nav_path,
};