import { DashboardContext } from '@/common/contexts/dashboard-context';
import { alpha, Collapse, List, ListItemText, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from 'react-icons/md';

import { ListItem, ListItemIcon } from './styles';

type NavItem = {
  title: string;
  path?: string;
  icon: React.ReactElement;
  info?: string;
};

type Props = NavItem & {
  subNavItems?: NavItem[];
};

const DashboardSidebarNavItem = ({
  title,
  path,
  icon,
  info,
  subNavItems,
}: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const { activeRoutePathname } = useContext(DashboardContext);
  const isActiveRoot =
    activeRoutePathname === path ||
    !!subNavItems?.find((subItem) => {
      console.log(activeRoutePathname === subItem.path);
      return subItem.path === activeRoutePathname;
    });
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleNavigation = (page: string) => {
    router.push(page);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity,
    ),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
  };

  if (subNavItems) {
    return (
      <>
        <ListItem css={isActiveRoot && activeRootStyle} onClick={handleOpen}>
          <ListItemIcon>{icon && icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          {info && info}
          {open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowLeft />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subNavItems.map((item) => {
              const { title, path } = item;
              const isActiveSub = path === activeRoutePathname;

              return (
                <ListItem
                  key={title}
                  css={isActiveSub && activeSubStyle}
                  onClick={() => {
                    handleNavigation(path as string);
                  }}
                >
                  <ListItemIcon
                    css={
                      isActiveSub && {
                        color: theme.palette.primary.main,
                      }
                    }
                  >
                    {icon && icon}
                  </ListItemIcon>
                  <ListItemText disableTypography primary={title} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem
      onClick={() => {
        handleNavigation(path as string);
      }}
      css={isActiveRoot && activeRootStyle}
    >
      <ListItemIcon>{icon && icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItem>
  );
};

export { DashboardSidebarNavItem };
