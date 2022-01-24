import { useRouter } from 'next/router';
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

  useEffect(() => {
    setActiveRoutePathname(router.pathname.replace('/[id]', ''));
  }, [router.pathname]);

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
