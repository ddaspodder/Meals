"use client";

import Image from "next/image";
import PizzaLogo from "@/assets/pizza-logo.svg";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

export default function Header() {
  const path = usePathname();
  return (
    <div className={styles.header}>
      <Image
        src={PizzaLogo.src}
        alt="Pizza Logo"
        width={120}
        height={120}
        className={styles.logo}
      />
      <Link
        href="/"
        className={styles.homeLink}
        aria-current={path === "/" ? "page" : undefined}
      >
        <h1 className={styles.title}>Best Food Ever</h1>
      </Link>
      <div>
        <Link
          href="/community"
          className={`${styles.communityLink} ${
            path.startsWith("/community") ? styles.activeLink : ""
          }`}
          aria-current={path === "/community" ? "page" : undefined}
        >
          Community
        </Link>
        <Link
          href="/meals"
          className={`${styles.communityLink} ${
            path.startsWith("/meals") ? styles.activeLink : ""
          }`}
          aria-current={path === "/meals" ? "page" : undefined}
        >
          Meals
        </Link>
      </div>
    </div>
  );
}
