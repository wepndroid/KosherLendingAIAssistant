import { createFileRoute } from "@tanstack/react-router";
import { GeneratorPage } from "@/pages/GeneratorPage";

export const Route = createFileRoute("/_app/generator")({
  component: GeneratorPage,
});
