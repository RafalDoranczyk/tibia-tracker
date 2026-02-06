import { Divider, Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type SectionHeaderProps = {
  icon: ReactNode;
  title: string;
};

export function SectionHeader({ icon, title, children }: PropsWithChildren<SectionHeaderProps>) {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
        {icon}
        <Typography fontWeight={700}>{title}</Typography>

        {children}
      </Stack>

      <Divider />
    </>
  );
}
