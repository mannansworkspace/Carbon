import { useAppSelector } from "app/hooks";
import {
  selectAuthenticated,
  selectIsLoadedClient
} from "../app/reducers/authSlice";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { selectAdminAuthenticated, selectIsLoadedAdmin } from "@reducers/admin/authSlice";
import { isAdmin } from "app/utils";

const PrivateRoute = (WrappedComponent: ComponentType) => {

  return (props: any) => {
    const router = useRouter();
    const auth = useAppSelector(selectAuthenticated);
    const isAdminLoaded = useAppSelector(selectIsLoadedAdmin);
    const isClientLoaded = useAppSelector(selectIsLoadedClient);

    const isAdminAuthenticated = useAppSelector(selectAdminAuthenticated)

    useEffect(() => {
        if(isAdmin(router.pathname)){
          isAdminLoaded && !isAdminAuthenticated && router.push("/admin/login");
        }
        else{
          isClientLoaded && !auth && router.push("/login");
        }
    }, [isAdminLoaded, isClientLoaded]);
    
    return (auth || isAdminAuthenticated) ? <div className="content-container"><WrappedComponent {...props} /></div> : <></>;
  };
};

export default PrivateRoute;
