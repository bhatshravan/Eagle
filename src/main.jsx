import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";
// import { MantineProvider } from "@mantine/core";

import Positions from "./components/Positions";

import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import {Home} from "./components/Home";
import Nav from "./components/common/Nav";
// import Telegram from "./components/Telegram";
// import Sheets from "./components/Sheets";
import {News} from "./components/News";
// import Bhav from "./components/Bhav";
// import Limits from "./components/Limits";
import {Holdings} from "./components/Holdings";
// import Positions from "./components/Positions";

import '@mantine/core/styles.css';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Positions />,
  },
  {
    path: "/hello",
    element: <h1>Hello</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Nav />

          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/news" element={<News />} />
            {/* <Route path="/telegram" element={<Telegram />} />
            <Route path="/sheets" element={<Sheets />} />
            <Route path="/bhav" element={<Bhav />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/Limits" element={<Limits />} /> */}
            <Route path="/Holdings" element={<Holdings />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
