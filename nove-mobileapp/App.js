import AppNavigator from "./components/navigation/AppNavigator";
import React from "react";
import { ThemeProvider } from "react-native-rapi-ui";

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
