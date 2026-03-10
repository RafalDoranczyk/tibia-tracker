import { Box } from "@mui/material";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { getUser } from "@/actions/get-user";
import {
  APP_BAR_HEIGHT,
  DESKTOP_APP_NAVIGATION_DRAWER_WIDTH,
  Navigation,
} from "@/modules/navigation";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await getUser();
  console.log("ADMIN PROXY");

  const role = user?.app_metadata?.role;

  if (!user && role !== "admin") {
    return notFound();
  }

  console.log(role);

  return (
    <>
      <Navigation />

      <Box ml={{ lg: DESKTOP_APP_NAVIGATION_DRAWER_WIDTH }} mt={APP_BAR_HEIGHT} p={4}>
        {children}
      </Box>
    </>
  );
}
