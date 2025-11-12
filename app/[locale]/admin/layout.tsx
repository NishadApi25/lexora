import Menu from "@/components/shared/header/menu";
import { getSetting } from "@/lib/actions/setting.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AdminNav } from "./admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { site } = await getSetting();
  return (
    <>
      <div className="flex flex-col">
        <div className="bg-black text-white">
          <div className="flex h-16 items-center px-2">
            <Link href="/">
              <Image
                src="/icons/logo.svg"
                width={48}
                height={48}
                alt={`${site.name} logo`}
              />
            </Link>

            {/*  Admin Navigation */}
            <AdminNav className="mx-6 hidden md:flex" />

            <div className="ml-auto flex items-center space-x-4">
              <Menu forAdmin />
            </div>
          </div>

          {/*  For mobile view */}
          <div>
            <AdminNav className="flex md:hidden px-4 pb-2" />
          </div>
        </div>

        {/* Affiliate Dashboard Link */}
        <div className="bg-gray-100 border-b px-4 py-2">
          <Link
            href="/local/admin/affiliate"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Affiliate Dashboard
          </Link>
        </div>

        {/*  Main Admin Page Content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </>
  );
}
