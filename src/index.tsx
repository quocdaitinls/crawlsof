import {CssBaseline} from "@mui/material";
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "react-query";
import App from "./App";
import {AppProvider} from "./context/AppContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppProvider>
);
