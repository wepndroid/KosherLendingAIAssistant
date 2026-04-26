import { createFileRoute } from "@tanstack/react-router";
import { KeywordsPage } from "@/pages/KeywordsPage";

export const Route = createFileRoute("/_app/keywords")({
  component: KeywordsPage,
});
