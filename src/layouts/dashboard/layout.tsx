import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";

import { _langs, _notifications } from "src/_mock";

import { Iconify } from "src/components/iconify";

import { Main } from "./main";
import { layoutClasses } from "../classes";
import { NavMobile, NavDesktop } from "./nav";
import { navUserData, navAdminData, navUser } from "../config-nav-dashboard";
// import { Searchbar } from "../components/searchbar";
import { _workspaces } from "../config-nav-workspace";
import { MenuButton } from "../components/menu-button";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";
import { AccountPopover } from "../components/account-popover";
import { Badge, IconButton } from "@mui/material";
import useGet from "src/hooks/get";
import {
  notificationCountAdmin,
  notificationCountUser,
} from "src/hooks/api/url";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({
  sx,
  children,
  header,
}: DashboardLayoutProps) {
  const theme = useTheme();

  const [navOpen, setNavOpen] = useState(false);
  const role = sessionStorage.getItem("ROLE");
  const { data, get } = useGet();

  useEffect(() => {
    get(role === "ROLE_ADMIN" ? notificationCountAdmin : notificationCountUser);
  }, []);

  const layoutQuery: Breakpoint = "lg";

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: "none" },
                  }}
                />
                <NavMobile
                  data={role === "ROLE_ADMIN" ? navAdminData : navUserData || role === "ROLE_HOKIM" ? navUser: navUserData  || role === "ROLE_USER" ? navUserData : navUser}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                {/* <Searchbar />
                <LanguagePopover data={_langs} /> */}
                <Link to="/notifications">
                  <IconButton
                    color={"default"}
                    // sx={sx}
                    // {...other}
                  >
                    <Badge badgeContent={+data ? +data : 0} color="error">
                      <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
                    </Badge>
                  </IconButton>
                </Link>
                <AccountPopover
                  data={[
                    {
                      label: "Home",
                      href: "/",
                      icon: (
                        <Iconify
                          width={22}
                          icon="solar:home-angle-bold-duotone"
                        />
                      ),
                    },
                    {
                      label: "Profile",
                      href: "#",
                      icon: (
                        <Iconify
                          width={22}
                          icon="solar:shield-keyhole-bold-duotone"
                        />
                      ),
                    },
                    {
                      label: "Settings",
                      href: "#",
                      icon: (
                        <Iconify
                          width={22}
                          icon="solar:settings-bold-duotone"
                        />
                      ),
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop
          data={role === "ROLE_ADMIN" ? navAdminData : navUserData || role === "ROLE_HOKIM" ? navUser: navUserData  || role === "ROLE_USER" ? navUserData : navUser}
          layoutQuery={layoutQuery}
          workspaces={_workspaces}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        "--layout-nav-vertical-width": "300px",
        "--layout-dashboard-content-pt": theme.spacing(1),
        "--layout-dashboard-content-pb": theme.spacing(8),
        "--layout-dashboard-content-px": theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: "var(--layout-nav-vertical-width)",
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
