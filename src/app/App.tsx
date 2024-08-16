import { Home } from "@/pages/Home";
import { StoreProvider } from "./providers/StoreProviderf";
import "@/app/styles/global.css";
import { Toaster } from "@/shared/ui/toaster";

export function App() {
  return (
    <StoreProvider>
      <Home />
      <Toaster />
    </StoreProvider>
  );
}
