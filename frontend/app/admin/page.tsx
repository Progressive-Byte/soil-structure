"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "./_lib/adminApi";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(getToken() ? "/admin/projects" : "/admin/login");
  }, [router]);

  return null;
}
