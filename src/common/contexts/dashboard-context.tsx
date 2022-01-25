import { REFRESH_TOKEN_NAME } from '@/common/consts/api';
import { PAGE_AUTH_LOGIN } from '@/common/consts/pages';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { createContext, useEffect, useState } from 'react';

type DashboardContextProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
  onOpenSidebar: () => void;
  activeRoutePathname: string | null;
};

export const DashboardContext = createContext({} as DashboardContextProps);

type Props = {
  children: React.ReactElement;
};

export const DashboardProvider = ({ children }: Props) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const router = useRouter();
  const [activeRoutePathname, setActiveRoutePathname] = useState<string | null>(
    null,
  );
  const [isLoadingFirstRender, setIsLoadingFirstRender] = useState(true);

  useEffect(() => {
    setActiveRoutePathname(router.pathname.replace('/[id]', ''));
  }, [router.pathname]);

  useEffect(() => {
    const { [REFRESH_TOKEN_NAME]: refreshToken } = parseCookies();
    if (!refreshToken) {
      router.push(PAGE_AUTH_LOGIN);
    } else {
      setIsLoadingFirstRender(false);
    }
  }, []);

  if (isLoadingFirstRender) return null;

  return (
    <DashboardContext.Provider
      value={{
        isOpenSidebar,
        activeRoutePathname,
        onOpenSidebar: () => {
          setIsOpenSidebar(true);
        },
        onCloseSidebar: () => {
          setIsOpenSidebar(false);
        },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
