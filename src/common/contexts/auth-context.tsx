import { LogoutConfirmation } from '@/common/components/logout-confirmation';
import {
  ACCESS_TOKEN_NAME,
  DEFAULT_EXPIRE_ACCESS_TOKEN_TOKEN,
  DEFAULT_EXPIRE_REFRESH_TOKEN,
  REFRESH_TOKEN_NAME,
} from '@/common/consts/api';
import { PAGE_CUSTOMER_DASHBOARD } from '@/common/consts/pages';
import { ProfileModel } from '@/common/models/profile-model';
import { httpLogin } from '@/modules/auth/api/login/http-login';
import { httpLoadProfile } from '@/modules/auth/api/profile/http-load-profile';
import { LoginData } from '@/modules/auth/types/login-data';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { createContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

type AuthContextProps = {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  profile: ProfileModel | null;
  onOpenLogout: () => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

type Props = {
  children: React.ReactElement;
};

export const AuthProvider = ({ children }: Props) => {
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const isAuthenticated = !!profile;
  const router = useRouter();
  const { mutate } = useMutation(httpLoadProfile, {
    onSuccess: (profile: ProfileModel) => {
      console.log(profile);
    },
  });

  useEffect(() => {
    const {
      [ACCESS_TOKEN_NAME]: accessToken,
      [REFRESH_TOKEN_NAME]: refreshToken,
    } = parseCookies();

    // if (accessToken && refreshToken) {
    //   mutate();
    // }
  }, []);

  const login = async ({ email, password }: LoginData) => {
    const { accessToken, refreshToken } = await httpLogin({
      email,
      password,
    });
    setCookie(undefined, ACCESS_TOKEN_NAME, accessToken, {
      maxAge: DEFAULT_EXPIRE_ACCESS_TOKEN_TOKEN,
      // maxAge: 60 * 60 * 1 * 24 * 30,
    });
    setCookie(undefined, REFRESH_TOKEN_NAME, refreshToken.id, {
      maxAge: DEFAULT_EXPIRE_REFRESH_TOKEN,
      path: '/',
      // maxAge: 60 * 60 * 1 * 24 * 30,
    });
    router.replace(PAGE_CUSTOMER_DASHBOARD);
  };

  const logout = () => {
    destroyCookie(undefined, ACCESS_TOKEN_NAME);
    destroyCookie(undefined, REFRESH_TOKEN_NAME);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        profile,
        login,
        logout,
        onOpenLogout: () => {
          setIsOpenLogout(true);
        },
      }}
    >
      <LogoutConfirmation
        isOpen={isOpenLogout}
        handleClose={() => {
          setIsOpenLogout(false);
        }}
      />
      {children}
    </AuthContext.Provider>
  );
};
