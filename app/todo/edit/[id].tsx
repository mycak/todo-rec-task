import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useToDos } from "@/hooks/useToDos";
import { Ionicons } from "@expo/vector-icons";
import { colors, sharedStyles } from "../../styles/shared";
import { useState } from "react";
import { ToDoStatusSchema } from "@/client/api/types/schemas/enums/ToDoStatus.schema";
import { formatStatus } from "@/utils";
import { z } from "zod";

export default function EditToDo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getToDo, createToDo, updateToDo } = useToDos();
  const isNew = id === "new";

  const { data: todo, isLoading, isError } = getToDo(isNew ? -1 : Number(id));

  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [status, setStatus] = useState<typeof ToDoStatusSchema._type>(
    todo?.status || "PENDING"
  );
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  if (isLoading && !isNew)
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2bd247" />
        <Text style={styles.loadingText}>Loading todo...</Text>
      </View>
    );

  if (isError && !isNew)
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
        <Text style={styles.errorText}>Error loading todo</Text>
      </View>
    );

  const validateForm = () => {
    const baseSchema = z.object({
      title: z.string().min(3, "Title must be at least 3 characters"),
      description: z
        .string()
        .min(3, "Description must be at least 3 characters"),
      status: ToDoStatusSchema,
    });

    try {
      baseSchema.parse({ title, description, status });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: typeof errors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          newErrors[path as keyof typeof errors] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isNew) {
        const newTodo = await createToDo({ title, description, status });
        router.push(`/todo/${newTodo.id}`);
      } else {
        await updateToDo({ id: Number(id), title, description, status });
        router.back();
      }
    } catch (error) {
      console.error("Failed to save todo:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isNew ? "Create Todo" : "Edit Todo"}
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            placeholderTextColor="#666"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            {Object.values(ToDoStatusSchema.Values).map((statusOption) => (
              <TouchableOpacity
                key={statusOption}
                style={[
                  styles.statusOption,
                  status === statusOption && styles.selectedStatus,
                ]}
                onPress={() => setStatus(statusOption)}
              >
                <Text style={styles.statusText}>
                  {formatStatus(statusOption)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isNew ? "Create" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  centerContainer: sharedStyles.centerContainer,
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginLeft: 20,
  },
  form: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: colors.white,
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: colors.background,
    color: colors.white,
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statusOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  selectedStatus: {
    backgroundColor: colors.secondary,
  },
  statusText: {
    color: colors.white,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: sharedStyles.loadingText,
  errorText: {
    ...sharedStyles.errorText,
    fontSize: 12,
  },
});
