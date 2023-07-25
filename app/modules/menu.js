export const PartnerMenu = [
  // {
  //   label: "Get started",
  //   icon: "",
  //   route: "/dashboard/getstarted",
  // },
  {
    label: "Dashboard",
    icon: "",
    route: "/dashboard",
  },
  {
    label: "Compliance",
    icon: "",
    route: "/dashboard/compliance",
  },
  
  // {
  //   label: "Services",
  //   icon: "",
  //   route: "",
  // },
  // {
  //   label: "Payment",
  //   icon: "",
  //   route: "",
  // },
  // {
  //   label: "Users",
  //   icon: "",
  //   route: "",
  // },
  // {
  //   label: "Reports",
  //   icon: "",
  //   route: "",
  // },
  // {
  //   label: "Audit log",
  //   icon: "",
  //   route: "",
  // },
  // {
  //   label: "Settings",
  //   icon: "",
  //   route: "",
  // },
];
];
export const AdminMenu = [
  {
    label: "Dashboard",
    icon: "",
    route: "/admin/dashboard",
  },
  {
    label: "Compliance",
    icon: "",
    route: "/admin/compliance",
  },
  {
    label: "Approvals",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z" clip-rule="evenodd" />
          </svg>,
    route: "/admin/approvals",
  },
];

export const PageRoutes = {
  home: "/",
  login: "/login",
  register: "/onboarding/register",
  partnerwelcome: "/onboarding/register/partnerwelcome",
  passwordreset: "/onboarding/register/resetpassword",
  setpassword: "/onboarding/setpassword",
  registerUserinfo: "/onboarding/register/userinfo",
  dashboard: "/dashboard",
  getstarted: "/dashboard/getstarted",
  companyinfo: "/dashboard/getstarted/onboarding/companyinfo",
  partnerCompliance: "/dashboard/compliance",

  // admin
  adminlogin: "/admin/login",
  admindashboard: "/admin/dashboard",
};
};
