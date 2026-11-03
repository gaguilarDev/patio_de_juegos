"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type BackLinkProps = {
  href: string;
  label: string;
};

export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <motion.div
      className="fixed top-9 left-5 z-50"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
    >
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full border border-amber-200/50 bg-[#1a0c10]/85 px-4 py-2 font-medium text-amber-50 backdrop-blur-sm transition duration-300 hover:border-amber-200 hover:bg-[#2a1218] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {label}
      </Link>
    </motion.div>
  );
}
