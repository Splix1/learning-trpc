import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState, useEffect } from 'react';
import { trpc } from './utils/trpc';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllCampuses from './Components/Campuses/AllCampuses';
import NavBar from './Components/NavBar/NavBar';
import SingleCampus from './Components/Campuses/SingleCampus';

const routes = [
  <Route key="/" path="/campuses" element={<AllCampuses />} />,
  <Route key="/" path="/campuses/:id" element={<SingleCampus />} />,
]

export function App() {


  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/rpc',
          // optional
          headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavBar />
          <Routes>{routes}</Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}







