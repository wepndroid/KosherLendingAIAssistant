import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ location }) => {
    if (typeof window === "undefined") return;

    const authed = localStorage.getItem("kl_auth") === "1";
    if (!authed) {
      throw redirect({ to: "/" });
    }

    if (location.pathname !== "/dashboard") {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: AppLayout,
});
