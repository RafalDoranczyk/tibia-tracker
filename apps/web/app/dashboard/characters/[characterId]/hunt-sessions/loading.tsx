import { Table } from "@/components";
import { PageHeaderSkeleton } from "@/layout/page";

export default function HuntSessionsLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <Table.Skeleton />
    </>
  );
}
