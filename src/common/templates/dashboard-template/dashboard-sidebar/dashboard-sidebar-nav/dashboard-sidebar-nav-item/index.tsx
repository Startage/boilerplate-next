import { Link } from '@/common/components';
import { DashboardContext } from '@/common/contexts/dashboard-context';
import {
  alpha,
  Box,
  Collapse,
  Icon,
  List,
  ListItemText,
  useTheme,
} from '@mui/material';
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
  const { activeRoutePathname } = useContext(DashboardContext);
  const isActiveRoot =
    activeRoutePathname === path ||
    !!subNavItems?.find((subItem) => {
      console.log(activeRoutePathname === subItem.path);
      return subItem.path === activeRoutePathname;
    });
  const find = subNavItems?.find((subItem) => {
    return subItem.path === activeRoutePathname;
  });
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
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
                  component={Link}
                  href={path}
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
      css={isActiveRoot && activeRootStyle}
      component={Link}
      href={path}
    >
      <ListItemIcon>{icon && icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItem>
  );
};

export { DashboardSidebarNavItem };
