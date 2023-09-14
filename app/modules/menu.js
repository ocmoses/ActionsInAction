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
  {
    label: "Contracts",
    icon: <div className="relative inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
              stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" fill="white" 
                className="w-4 h-6 absolute top-0 right-0">
              <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
            </svg>
          </div>,
    route: "/dashboard/contracts",
  }
  
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
  //   route: "/admin/reports",
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
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>,
    route: "/admin/approvals",
  },
  {
    label: "Reports",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>,
    route: "/admin/reports",
  },
  {
    label: "Contracts",
    icon: <div className="relative inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
              stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" fill="white" 
                className="w-4 h-6 absolute top-0 right-0">
              <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
            </svg>
          </div>,
    route: "/admin/contracts",
  }
];

export const PageRoutes = {
  home: "/",
  faq: "/faq",
  termOfUse: "/term-of-use",
  privacyNotice: "/privacy-notice",
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
