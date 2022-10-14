import React from "react";


export type DappType = {
  configs: {
    icon: (props: React.HTMLAttributes<HTMLImageElement>) => JSX.Element;
    name: string;
    path: string;
    menuLink?: string;
    children?: {
      name: string;
      path: string;
      menuLink?: string;
    }[];
  };
  Component: any;
};

export type SidebarConfigType = {
  siteName: string
  disabledApps: string[]
  menuLinks: MenuLinkType[]
  helpLinks: HelpLinkType[]
}

export type MenuLinkType = {
  icon: string
  name: string
  link: string
  target: string
}

export type HelpLinkType = {
  href: string
  icon: string
}

export type SubMenuItem = { name: string; path: string };
export type MenuItem = SubMenuItem & { children: MenuItem[]; icon: React.Component };
