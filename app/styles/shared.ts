import { StyleSheet } from "react-native";

export const colors = {
  background: "#25292e",
  surface: "#2f3542",
  surfaceLight: "#3f4555",
  primary: "#2bd247",
  secondary: "#4169E1",
  error: "#ff6b6b",
  white: "#fff",
};

export const sharedStyles = StyleSheet.create({
  // Layout styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  // State styles
  loadingText: {
    color: colors.white,
    fontSize: 18,
    marginTop: 16,
    fontWeight: "500",
  },
  errorText: {
    color: colors.error,
    fontSize: 18,
    marginTop: 12,
    fontWeight: "500",
    textAlign: "center",
  },

  // Button styles
  buttonBase: {
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
