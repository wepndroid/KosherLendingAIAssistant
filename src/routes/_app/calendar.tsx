import { createFileRoute } from "@tanstack/react-router";
import { CalendarPage } from "@/pages/CalendarPage";

export const Route = createFileRoute("/_app/calendar")({
  component: CalendarPage,
});
