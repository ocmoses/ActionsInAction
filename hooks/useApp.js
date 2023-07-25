"use client"
import { useStoreActions, useStoreState } from "easy-peasy"
import { Util, isObject, filterPartner } from "@/app/modules/utilities"

const useApp = () => {
  const states = useStoreState((state) => state);
  const actions = useStoreActions((action) => action);

  const appStates = states.app;
  const appActions = actions.app;

  const previewFiles = (url) => {
    if (url) {
      appActions.setPreviewingPath(url);
      appActions.setIsPreviewingDoc(true);
    } else {
      appActions.setPreviewingPath("");
      appActions.setIsPreviewingDoc(false);
    }
  };
  function handleCloseModal() {
    appActions.setPreviewingPath("");
    appActions.setIsPreviewingDoc(false);
  }

  const setStoreStates = (serverSession, categories, source) => {
    if (categories?.error) appActions.setError({ global: categories.error });
    if (serverSession?.type === "user") {
      if (serverSession?.status === "authenticated") {
        if (serverSession?.User?.user.uuid) {
          serverSession.User.user.status = "authenticated";


          // console.log('serverSession.User.access_token', serverSession.User.access_token);
          if(serverSession.User.access_token != null && serverSession.User.access_token != undefined){
            serverSession.User.user.token = serverSession.User.access_token;
            actions.users.setToken(serverSession.User.access_token);
          }           

          actions.users.setUser(serverSession.User.user);
          
          // console.log('serverSession', serverSession);
                   

          if (serverSession?.User?.partners?.length) {
            const PartnersAccounts = [];
            serverSession.User.partners.map((partner) =>
              PartnersAccounts.push(filterPartner(partner, categories))
            );
            actions.partners.setPartners(PartnersAccounts);
          }
          if (
            isObject(serverSession?.User?.partner) &&
            !Util.isEmpty(serverSession?.User?.partner)
          ) {
            // filter partner info hook to add other data before commiting to store
            const partnerInfo = filterPartner(
              serverSession?.User?.partner,
              categories
            );
            actions.partners.setPartner(partnerInfo);
            actions.partners.setPartnerCategories(partnerInfo?.categories);
          } else {
            if (serverSession?.User?.partners?.length) {
              const ptr = filterPartner(
                serverSession?.User?.partners[0],
                categories
              );
              actions.partners.setPartner(ptr);
              actions.partners.setPartnerCategories(ptr?.categories);
            }
          }

          if (serverSession?.User?.partnerID)
            actions.partners.setPartnerID(serverSession?.User?.partnerID);

          actions.partners.setCategories(categories.data);
          if (categories.error) appActions.setError(categories.error);
        }
      }
    }
    if (serverSession?.type === "admin") {
      // console.log("categories?.data", categories?.data)
      actions.admins.setToken(serverSession?.token);
      actions.admins.setAdmin(serverSession?.User);
      actions.admins.setCategories(categories?.data);
    }
  };

  return {
    ...appStates,
    ...appActions,
    setStoreStates,
    previewFiles,
    handleCloseModal,
  };
};

export default useApp;
