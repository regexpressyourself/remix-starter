export type MenuItem = {
  href: string;
  title: JSX.Element;
  onClick?: (arg: React.MouseEvent<any, MouseEvent>) => void;
};
export type MenuItems = MenuItem[];
export type NavButtons = JSX.Element[];
