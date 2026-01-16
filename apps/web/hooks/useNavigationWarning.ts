import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function useNavigationWarning(shouldWarn: boolean) {
  const router = useRouter();
  const confirmedRef = useRef(false);

  useEffect(() => {
    if (!shouldWarn) return;

    const originalPush = router.push;

    router.push = ((...args: unknown[]) => {
      if (!confirmedRef.current) {
        const ok = window.confirm("You have unsaved changes. Are you sure you want to leave?");

        if (!ok) return;
        confirmedRef.current = true;
      }

      return originalPush.apply(router, args as Parameters<typeof originalPush>);
    }) as typeof router.push;

    return () => {
      router.push = originalPush;
    };
  }, [shouldWarn, router]);
}
