
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import ChatWidget from "./components/feature/ChatWidget";

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppRoutes />
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App;
