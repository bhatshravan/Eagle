import {  Routes, Route } from "react-router";
import Nav from "./components/common/Nav";
import Home from "./components/Home";
import Telegram from "./components/Telegram";
import Sheets from "./components/Sheets";
import News from "./components/News";
import Bhav from "./components/Bhav";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import Positions from "./components/Positions";
import Limits from "./components/Limits";
// import Holdings from "./components/Holdings";


export default function App() {
  
  return (
    <>
    Hello
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/telegram" element={<Telegram />} />
            <Route path="/news" element={<News />} />
            <Route path="/sheets" element={<Sheets />} />
            <Route path="/bhav" element={<Bhav />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/Limits" element={<Limits />} />
            {/* <Route path="/Holdings" element={<Holdings />} /> */}
          </Routes>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
