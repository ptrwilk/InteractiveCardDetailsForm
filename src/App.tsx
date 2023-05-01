import { ThemeProvider, createTheme } from "@mui/material";
import "./styles.css";
import InteractiveCardDetailsFormPage from "./Pages/InteractiveCardDetailsFormPage";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: 18,
    },
    fontFamily: "Space Grotesk",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <InteractiveCardDetailsFormPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
