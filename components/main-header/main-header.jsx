import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";
import MainHeaderBackground from "./main-header-background";

import classes from "./main-header.module.css";
import NavLink from "./nav-link";

const MENU = [
  { href: "/meals", title: "Browse Meals" },
  { href: "/community", title: "Foodies Community" },
]

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            {MENU.map(item => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}