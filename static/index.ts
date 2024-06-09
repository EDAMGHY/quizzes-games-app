import { uuid } from "@/lib/utils";
import { IAppInfo, IMenu, ISocial } from "@/types";
import { Home, Info, PlusCircle } from "lucide-react";
import { FaGithub, FaX, FaLinkedinIn } from "react-icons/fa6";

export const appInfo: IAppInfo = {
  name: "QuizzesGamesApp",
  version: "1.0.0",
  author: "Abdellah DAMRI",
  email: "damriabdellah@gmail.com",
};

export const menus: IMenu[] = [
  {
    id: uuid(),
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    id: uuid(),
    title: "Create",
    href: "/create",
    icon: PlusCircle,
  },
  {
    id: uuid(),
    title: "About",
    href: "/about",
    icon: Info,
  },
];

export const socials: ISocial[] = [
  {
    id: uuid(),
    href: "https://linkedin.com/in/abdellah-damri",
    icon: FaGithub,
  },
  {
    id: uuid(),
    href: "https://github.com/EDAMGHY",
    icon: FaLinkedinIn,
  },
  {
    id: uuid(),
    href: "https://x.com/damriabdellah",
    icon: FaX,
  },
];
