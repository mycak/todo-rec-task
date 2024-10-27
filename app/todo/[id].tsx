import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { useToDos } from "@/hooks/useToDos";
import { Ionicons } from "@expo/vector-icons";
import { formatStatus, getStatusColor } from "@/utils";
import { colors, sharedStyles } from "../styles/shared";

export default function ToDoView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getToDo, deleteToDo } = useToDos();

  const { data: todo, isLoading, isError } = getToDo(Number(id));

  if (isLoading)
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2bd247" />
        <Text style={styles.loadingText}>Loading todo...</Text>
      </View>
    );

  if (isError)
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
        <Text style={styles.errorText}>Error loading todo</Text>
      </View>
    );

  if (!todo)
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
        <Text style={styles.errorText}>Todo not found</Text>
      </View>
    );

  const handleDelete = async () => {
    try {
      deleteToDo(Number(id));
      router.back();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const createdAt = new Date(todo.createdAt).toLocaleDateString("en-GB");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.headerButtons}>
          <Link href={`/todo/edit/${id}`} asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
            <Ionicons name="trash" size={24} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.todoContainer}>
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.description}>{todo.description}</Text>
        <Text style={[styles.status, { color: getStatusColor(todo.status) }]}>
          {formatStatus(todo.status)}
        </Text>
        <Text style={styles.date}>Created: {createdAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  centerContainer: sharedStyles.centerContainer,
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  todoContainer: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.white,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#808080",
  },
  loadingText: sharedStyles.loadingText,
  errorText: sharedStyles.errorText,
});
