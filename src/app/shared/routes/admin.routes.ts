const adminProjectsNavPath = {
  adminProjects: '/admin/projects',
  adminAddProject: '/admin/projects/add',
  adminEditProject: (id: string) => `/admin/projects/${id}/edit`,
};

const adminUsersNavPath = {
  adminUsers: '/admin/users',
  adminUserDetail: (id: string) => `/admin/users/${id}`,
};

const adminTechnologiesNavPath = {
  adminTechnologies: '/admin/technologies',
  adminCreateTechnology: '/admin/technologies/create',
  adminEditTechnology: (id: string) => `/admin/technologies/${id}/edit`,
  adminDetailTechnology: (id: string) => `/admin/technologies/${id}`,
};

export const adminNavPath = {
  admin: '/admin',
  adminDashboard: '/admin/dashboard',
  ...adminProjectsNavPath,
  adminFileManager: '/admin/file-manager',
  ...adminUsersNavPath,
  ...adminTechnologiesNavPath,
};
