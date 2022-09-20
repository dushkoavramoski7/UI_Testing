import {theme} from "./theme/Theme";
import { ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter} from "react-router-dom";
import AllRoutes from "./auth/AllRoutesConfig";
function App() {
  return (
      <ThemeProvider theme={theme}>
        <div className="App">
            <BrowserRouter>
                <AllRoutes/>
            </BrowserRouter>
        </div>
      </ThemeProvider>
  );
}

export default App;
