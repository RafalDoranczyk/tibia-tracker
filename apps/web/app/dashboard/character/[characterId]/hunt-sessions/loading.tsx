import { TableSkeleton } from "@/components";
import { PageHeaderSkeleton } from "@/layout/page/PageHeader";

export default function HuntSessionsLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <TableSkeleton />
    </>
  );
}
