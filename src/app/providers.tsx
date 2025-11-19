'use client';

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { type PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export const Providers = ({ children }: PropsWithChildren) => (
    <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </AppRouterCacheProvider>
);
