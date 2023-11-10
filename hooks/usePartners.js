import useProcessing from "@/hooks/useProcessing"
import useRegistration from "@/hooks/useRegistration"
import useErrors from "@/hooks/useErrors"
import RemoteEndpoints from "@/app/modules/endpoints"
import Axios from "@/app/modules/axios"
import useApp from "@/hooks/useApp"
import useUsers from "@/hooks/useUsers"
import { PageRoutes } from "@/app/modules/menu"
import { fetchData } from "@/app/modules/fetchData"
import { apiURL } from "@/app/modules/constants"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Util,
  isArray,
  proxyFetch,
  userData,
  getNextStage,
  getstages,
} from "@/app/modules/utilities"
import { forms, fieldCounts } from "@/app/modules/constants"
import { getCategories } from "@/app/modules/categories"
import useLogout from "@/hooks/useLogout";

const usePartners = () => {
  const router = useRouter();
  const {Logout, LogoutAdmin} = useLogout();
  const { setProcessing, tmpUserUUID, setTmpUserUUID } = useProcessing()
  const { updateCategory } = useRegistration()
  const app = useApp()
  const rejectionReasons = app.rejectionReasons

  const [{ setError, setSuccess }] = useErrors({})
  const actions = useStoreActions((action) => action)
  const states = useStoreState((state) => state)

  const { category, categories } = states.partners
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
   setProcessing(false);
    const Categories = {}
    if (categories?.length > 0) {
      categories.map((category) => {
        Categories[category.uuid] = category
      })
    }
    setAllCategories(Categories)
  }, [categories])

  useEffect(() => {
   setProcessing(false);
    if (!rejectionReasons) app.getRejectionReasons()
  }, [rejectionReasons])

  const { setPartners, updatePartner, setCategory } = actions.partners
  const { setTmpUser } = actions.users
  // const { user } = states.users
  const users = useUsers();

  const [stageStatus, setStageStatus] = useState(null)

  const [validation, setValidation] = useState({
    required: [],
    optional: [],
    allForms: [],
  })

  const setValidationRules = (category) => {
    const required = []
    const list = []
    const optional = []
    const allForms = { required: [], optional: [], all: [], list: [] }
    if (category?.validation) {
      for (const validate in category.validation) {
        if (validate && forms[validate]) {
          if (forms[validate] && category.validation[validate] === "r") {
            list.push({
              label: forms[validate].label,
              listdesc: forms[validate].listdesc,
            })
            required.push(forms[validate].label)
            allForms.required.push(validate)
            allForms.all.push(validate)
          } else if (category?.validation[validate] === "o") {
            optional.push(forms[validate].label)
            allForms.optional.push(validate)
            allForms.all.push(validate)
          }
        }
      }
    }
    const validated = { required, optional, allForms, list }
    setValidation(validated)
    actions.app.setFormSteps(validated)
    actions.app.setActiveCategory(category?.uuid)
    return validated
  }

  const completeOnboarding = (category) => {
    const currentCategory = categories?.find((c) => c.uuid === category.uuid)
    category.validation = currentCategory.validation
    setCategory(category)
    setValidationRules(category)
  }

  const getPartner = async (uuid) => {
    const result = await proxyFetch(`${apiURL}/v1/auth/partner-info/${uuid}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    })
    const { success, error, data } = result
    return { success, error, data }
  }

  const setCurrentCategory = (category, partner) => {
    const baseCategory = categories?.find(
      (c) => c.uuid === category.category_uuid
    )
    category.category_name = baseCategory.category_name
    category.category_code = baseCategory.category_code
    category.validation = baseCategory.validation
    setCategory(category)
    setValidationRules(category)
  }

  const checkUpdateStatus = (stage) => {
    const progress = category.profile_stage
    return progress[stage] && parseInt(progress[stage]) ? true : false
  }

  const checkRegStatus = async (partner) => {
    if (!partner?.progress) return null
    const { percent, stages } = partner.progress
    if (!(percent < 100)) return { percent, nextstage: "dashboard" }
    const Stages = [
      "userinfo",
      "companyinfo",
      "category",
      "companydetail",
      "compliance",
      "ncclicense",
      "nlrclicense",
      "shortcode",
      "indemnity",
      "accountinfo",
    ]
    const Pages = {
      userinfo: "/onboarding/userinfo",
      companyinfo: "/profile/companyinfo",
      category: "/profile/category",
      companydetail: "/profile/companydetail",
      compliance: "/profile/compliance",
      ncclicense: "/profile/ncclicense",
      nlrclicense: "/profile/nlrclicense",
      shortcode: "/profile/shortcode",
      indemnity: "/profile/indemnity",
      accountinfo: "/profile/accountinfo",
    }
    let nextstage = null
    Stages.map((stage) => {
      if (!nextstage && parseInt(stages[stage]) === 0) nextstage = Pages[stage]
    })
    if (!nextstage) nextstage = PageRoutes.dashboard
    return { percent, nextstage }
  }

  const nextStage = (category, partner) => {
    return getNextStage(category, partner)
  }
  
  const getStages = (category, categories) => {
    if (!category) return
    return getstages(category, categories)
  }

  const registerPartner = async (frm, userdata) => {
    switch (frm) {
      // Existing partner flows
      case "partnerwelcome":
        setProcessing(true)
        const responsePartnerwelcome = await Axios.post(
          RemoteEndpoints.WELCOMEBACK,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.env.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          // console.log("e", e);
          return {
            success: false,
            error: `${e.message}. Please check your connection`,
            message: e.response.data.data.message,
            data: null,
          }
        })
        
        console.log("responsePartnerwelcome", responsePartnerwelcome);

        if (!responsePartnerwelcome) {
          setProcessing(false)
          return {
            success: false,
            error:
              "Something went wrong. Please check your connection and try again",
            data: null,
          }
        }
        
        const { success, data, message } = responsePartnerwelcome

        if (!success) {
          setProcessing(false)
          return { success: false, error: message, data: data }
        }
        

        setTmpUser(data.user)
        setPartners(data.partners)
        router.push(
          `/onboarding/verify/${data.user.uuid}/${userdata.email_type}`
        )
        break
      case "setpassword":
        setProcessing(true)
        const responseSetpassword = await Axios.post(
          RemoteEndpoints.RESETPASSWORD,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.env.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          return {
            success: false,
            error: `${e.message}. Please check your connection`,
            data: null,
          }
        })

        console.log("responseSetpassword", responseSetpassword);


        if (!responseSetpassword) {
          setProcessing(false)
          return {
            success: false,
            error:
              "Something went wrong. Please check your connection and try again",
            data: null,
          }
        }

        const { success: successSetpassword, data: setpassword } =
          responseSetpassword
        if (!successSetpassword) {
          setProcessing(false)
          return { success: false, error: setpassword.message, data: null }
        }
        setTmpUserUUID(null)
        const categories = await getCategories(process.env.NEXT_PUBLIC_APIKEY)
        const serverSession = {
          status: setpassword?.user?.uuid ? "authenticated" : "unauthenticated",
          User: setpassword,
          type: "user",
        }
        app.setStoreStates(serverSession, categories, "partner store")
        if (userdata.type === "new") return router.push(PageRoutes.getstarted)
        return router.push(PageRoutes.dashboard)
      case "userinfo":
        setProcessing(true)
        const responseUserinfo = await Axios.post(
          RemoteEndpoints.USERINFO,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.env.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          // console.log("e", e);
          return {
            success: false,
            error: `${e.message}. Please check you connection`,
            message: e.response.data.data.message,
            data: null,
          }
        })
        if (!responseUserinfo) {
          setProcessing(false)
          return {
            success: false,
            error:
              "Something went wrong. Please check your connection and try again",
            data: null,
          }
        }

        // console.log('responseUserinfo', responseUserinfo);

        const { success: successUserinfo, data: userinfo } = responseUserinfo

        if (!successUserinfo) {
          setProcessing(false)
          return { success: false, error: responseUserinfo.message, data: null }
        }
        const User = userData(userinfo)
        users.setTmpUser(User.user)
        router.push(`/onboarding/verify/${User.user.uuid}/new`)
        break
      case "category":
        setProcessing(true)
        const responseCategory = await Axios.post(
          RemoteEndpoints.CATEGORY,
          userdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: process.env.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          return {
            success: false,
            error: `${e.message}. Please check you connection`,
            data: null,
          }
        })
        if (!responseCategory) {
          setProcessing(false)
          return {
            success: false,
            error:
              "Something went wrong. Please check your connection and try again",
            data: null,
          }
        }

        const { success: successCategory, data: categoryData } =
          responseCategory
        if (!successCategory) {
          setProcessing(false)
          return { success: false, error: categoryData.message, data: null }
        }
        setCurrentCategory(categoryData.category, categoryData.partner)
        updatePartner(categoryData.partner)
        return { success: true, error: null, data: categoryData }
      case "companydetail":
        return updateCategory("companydetail", userdata)
      case "compliance":
        return updateCategory("compliance", userdata)
      case "ncclicense":
        return updateCategory("ncclicense", userdata)
      case "nlrclicense":
        return updateCategory("nlrclicense", userdata)
      case "shortcode":
        return updateCategory("shortcode", userdata)
      case "indemnity":
        return updateCategory("indemnity", userdata)
      case "accountinfo":
        return updateCategory("accountinfo", userdata)
      case "complete_registration":
        setProcessing(true)
        const regResponse = await Axios.post(
          RemoteEndpoints.REGISTRATION_COMPLETION,
          userdata,
          {
            timeout: process.env.NEXT_PUBLIC_TIMEOUT,
          }
        ).catch((e) => {
          setProcessing(false)
          return {
            success: false,
            error: `${e.message}. Please check you connection`,
            data: null,
          }
        })
        if (!regResponse) {
          setProcessing(false)
          return {
            success: false,
            error: ". Please check your connection and try again",
            data: null,
          }
        }

        const { success: regSuccess, data: regData } = regResponse
        if (!regSuccess) {
          setProcessing(false)
          return { success: false, error: regData.message, data: null }
        }

        return { success: true, error: null, data: regData }
    }
  }

  const resendEmail = async (email, email_type) => {
    
    setProcessing(true)

    const { data: resendEmailData, error: resendEmailError } = await fetchData(
      RemoteEndpoints.RESEND_CONFIRM_EMAIL_LINK,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          email,
          email_type,
        }),
      }
    )
    setProcessing(false)
    if (resendEmailError) {
      return setError({ verify: resendEmailError })
    }

    setSuccess(resendEmailData.message)
  }
  
  const updateStageStatus = (category, stage) => {
    if (!category || !stage) return
    console.log({
      "states.partners.partner.approvalStages":
        states.partners.partner.approvalStages,
    })
    const status =
      states?.partners?.partner?.approvalStages &&
      states.partners.partner.approvalStages[category.category_uuid]
        ? states.partners.partner.approvalStages[category.category_uuid][stage]
        : {}
    const fields = {}
    if (status) {
      for (const dept in status) {
        for (const field in status[dept]) {
          if (field !== "rejections" && !isArray(status[dept][field])) {
            if (!fields[field]) fields[field] = []
            fields[field].push(status[dept][field])
          }
        }
      }
    }
    const counts = {}
    if (!Util.isEmpty(fields)) {
      for (const field in fields) {
        counts[field] = {
          approved: 0,
          rejected: 0,
          corrected: 0,
          pending: 0,
        }
        if (fields[field].length > 0) {
          fields[field].map((f) => {
            counts[field][f]++
          })
        }
      }
    }
    // console.log({ fields })
    // console.log({ counts })
    // console.log({ fieldCounts })
  }

  const getAllAdminPartners = async (page, perPage) => {
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.ALL_ADMIN_PARTNERS.replace(':partner-uuid', states.partners.partner.uuid)}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.users.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );

      // console.log('states.users.token in usePartners', states.users.token);
      if (response.status === 401 ) {
        Logout();
        return;
      }
      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 401) {
        redirect(NextEndPoints.LOGIN)
        return
      }

      const result = await response.json();
      setProcessing(false);
      if (result?.success) {
        const admin_partners = result.data?.admin_users;
        // if (admins_users.length > 0)
        // admins_users.map((admin) => {
        //     filterPartner(admin, states.categories);
        //   });
        const navigation = {
          current_page: result?.data?.admin_users?.current_page,
          first_page_url: result?.data?.admin_users?.first_page_url,
          from: result?.data?.admin_users?.from,
          last_page: result?.data?.admin_users?.last_page,
          last_page_url: result?.data?.admin_users?.last_page_url,
          links: result?.data?.admin_users?.links,
          next_page_url: result?.data?.admin_users?.next_page_url,
          path: result?.data?.admin_users?.path,
          per_page: result?.data?.admin_users?.per_page,
          prev_page_url: result?.data?.admin_users?.prev_page_url,
          to: result?.data?.admin_users?.to,
          total: result?.data?.admin_users?.total,
        };

        // console.log('Admin partners retrieved', result);

        return {
          admin_partners,
          navigation,
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const getAllServices = async () => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_SERVICES}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.users.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );

      // console.log('states.users.token in usePartners', states.users.token);
      if (response.status === 400 || response.status === 401 ) {
        LogoutAdmin();
        return;
      }
      if (!response)
        return {
          error: "This request has no response available",
      };

      if (response.status === 401) {
        redirect(NextEndPoints.LOGIN)
        return
      }

      const result = await response.json();
      setProcessing(false);
      if (result?.success) {
        const service_types = result?.data['service-types'];
        
        // console.log('Service types retrieved', result);

        return {
          service_types
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const partnerSelectService = async (data) => {
    console.log("data being sent: ", data);
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.SELECT_SERVICE}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.users.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );

      
      
      if (!response)
      return {
        error: "This request has no response available",
      };

      if (response.status === 400 || response.status === 401 ) {
        Logout();
        return;
      }

      const result = await response.json();

      // console.log('RemoteEndpoints.SELECT_SERVICE', RemoteEndpoints.SELECT_SERVICE);
      // console.log('Select result', result);
      // console.log('states.users.token', states.users.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.messsage;
        const contract_id = result.data?.contract_id;
        
        console.log('Selected message', message);
        console.log('Contract ID', contract_id);

        return {
          message,
          contract_id
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  }

  const signBilateralContract = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.SIGN_CONTRACT}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.users.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );

      
      if (!response)
      return {
        error: "This request has no response available",
      };

      if (response.status === 401 ) {
        Logout();
        return;
      }
      

      const result = await response.json();

      // console.log('RemoteEndpoints.CREATE_PARTNER', RemoteEndpoints.CREATE_PARTNER);
      // console.log('Create result', result);
      // console.log('states.users.token', states.users.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Signed message', message);

        return {
          message
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const createPartner = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.CREATE_PARTNER}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: 'POST',
          body: data,
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.users.token,
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );
     
      
      if (!response)
      return {
        error: "This request has no response available",
      };

      if (response.status === 401 ) {
        Logout();
        return;
      }

      // console.log('Create response', response.text);

      const result = await response.json();

      // console.log('RemoteEndpoints.CREATE_PARTNER', RemoteEndpoints.CREATE_PARTNER);
      // console.log('Create result', result);
      // console.log('states.users.token', states.users.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Created message', message);

        return {
          message
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const submitAllSignatories = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.SUBMIT_SIGNATORIES}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.users.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );

      if (!response)
      return {
        error: "This request has no response available",
      };

      if (response.status === 401 ) {
        Logout();
        return;
      }

      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('submit signatories message', message);

        return {
          message
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  }

  const deletePartner = async (data) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.DELETE_PARTNER}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.users.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );

            
      if (!response)
      return {
        error: "This request has no response available",
      };

      if (response.status === 401 ) {
        Logout();
        return;
      }
      
      const result = await response.json();

      // console.log('RemoteEndpoints.DELETE_PARTNER', RemoteEndpoints.DELETE_PARTNER);
      // console.log('Create result', result);
      // console.log('states.users.token', states.users.token);

      setProcessing(false);
      if (result?.success) {
        const message = result.data?.message;
        
        console.log('Deleted message', message);

        return {
          message
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const verifyPartnerLink = async (link) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.VERIFY_PARTNER_LINK.replace(':link', link)}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response)
        return {
          error: "This request has no response available",
        };
      const result = await response.json();
      console.log('result', result);
    setProcessing(false);
        
      console.log('result', result);

      return {
        success: result?.success,
        message: result?.data?.message
      };
      
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const getContractDynamicData = async () => {
    try {
      
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.CONTRACT_DYNAMIC_CONTENT.replace(':partner_uuid', states.partners.partner.uuid)}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: states.users.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.users.token}`,
          },
        }
      );

      // console.log('states.users.token in usePartners', states.users.token);
      if (response.status === 400 || response.status === 401 ) {
        Logout();
        return;
      }
      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 401) {
        redirect(NextEndPoints.LOGIN)
        return
      }

      const result = await response.json();
      setProcessing(false);
      if (result?.success) {
        const data = result?.data['dynamic-details'];

        return {
          data
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const downloadContract = () => {
    return RemoteEndpoints.DOWNLOAD_CONTRACT
    .replace(':partner_uuid', states.partners.partner.uuid)
    .replace(':type', 'not_signed');
  };

  const downloadSignedContract = () => {
    return RemoteEndpoints.DOWNLOAD_CONTRACT
    .replace(':partner_uuid', states.partners.partner.uuid)
    .replace(':type', 'signed');
  };


  return {
    ...states.partners,
    ...actions.partners,
    getPartner,
    updatePartner,
    registerPartner,
    checkRegStatus,
    checkUpdateStatus,
    nextStage,
    resendEmail,
    validation,
    setValidation,
    setValidationRules,
    completeOnboarding,
    setCurrentCategory,
    getStages,
    allCategories,
    rejectionReasons,
    stageStatus,
    updateStageStatus,
    getAllAdminPartners,
    createPartner,
    deletePartner,
    getAllServices,
    partnerSelectService,
    submitAllSignatories,
    signBilateralContract,
    verifyPartnerLink,
    getContractDynamicData,
    downloadContract,
    downloadSignedContract
  }
}
export default usePartners
