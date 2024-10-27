import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1e1e1e", // Dark background to match theme
          },
          headerTintColor: "#2bd247", // Green accent color from the app
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "ToDo App",
          headerBackVisible: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  );
}
