import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import Sidebar from "./components/Sidebar";
import Wallet from "./pages/Wallet";
import Transactions from "./pages/Transactions";
import Header from "./components/Header";
import { store } from "./store/index";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header />
            <div style={{ display: "flex", flex: 1, paddingTop: "20px" }}>
              <Sidebar />
              <div style={{ flex: 1, padding: "0px 50px" }}>
                <Routes>
                  <Route path="/" element={<Wallet />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/transactions" element={<Transactions />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
