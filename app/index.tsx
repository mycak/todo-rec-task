import { useToDos } from "@/hooks/useToDos";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { ToDoStatusSchema } from "@/client/api/types/schemas/enums/ToDoStatus.schema";
import { formatStatus, getStatusColor } from "@/utils";
import { colors, sharedStyles } from "./styles/shared";

export default function Index() {
  const { todos, isLoading, isError, refetch, updateToDo } = useToDos();
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] =
    useState<typeof ToDoStatusSchema._type>("PENDING");

  if (isLoading)
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2bd247" />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );

  if (isError)
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
        <Text style={styles.errorText}>Error loading todos</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );

  const handleCheckbox = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id)
        ? prev.filter((checkedId) => checkedId !== id)
        : [...prev, id]
    );
  };

  const handleStatusUpdate = async () => {
    try {
      await Promise.all(
        checkedIds.map((id) =>
          updateToDo({
            id,
            status: selectedStatus,
          })
        )
      );
      await refetch();
      setCheckedIds([]);
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to update todos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/todo/edit/new" asChild>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.createButtonText}>Create New Todo</Text>
        </TouchableOpacity>
      </Link>
      {checkedIds.length > 0 && (
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: "#4169E1" }]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="options" size={24} color="white" />
          <Text style={styles.createButtonText}>Change Status</Text>
        </TouchableOpacity>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {!todos.data || todos.data.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="list" size={64} color={colors.white} />
            <Text style={styles.emptyText}>No items yet.</Text>
          </View>
        ) : (
          todos.data.map((todo) => (
            <View key={todo.id} style={styles.todoItem}>
              <Checkbox
                value={checkedIds.includes(todo.id)}
                onValueChange={() => handleCheckbox(todo.id)}
                style={styles.checkbox}
                color={checkedIds.includes(todo.id) ? "#2bd247" : undefined}
              />

              <View style={styles.todoContent}>
                <Text style={styles.todoTitle}>{todo.title}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(todo.status) },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {formatStatus(todo.status)}
                  </Text>
                </View>
              </View>

              <Link href={`/todo/${todo.id}`} asChild>
                <TouchableOpacity style={styles.arrowButton}>
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>
              </Link>
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Status</Text>

            {Object.values(ToDoStatusSchema.Values).map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusOption,
                  selectedStatus === status && styles.selectedStatus,
                ]}
                onPress={() => setSelectedStatus(status)}
              >
                <Text style={styles.statusOptionText}>
                  {formatStatus(status)}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.acceptButton]}
                onPress={handleStatusUpdate}
              >
                <Text style={styles.modalButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: sharedStyles.container,
  centerContainer: sharedStyles.centerContainer,
  loadingText: sharedStyles.loadingText,
  errorText: sharedStyles.errorText,
  retryButton: {
    ...sharedStyles.buttonBase,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  retryButtonText: sharedStyles.buttonText,
  createButton: {
    ...sharedStyles.buttonBase,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  createButtonText: {
    ...sharedStyles.buttonText,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colors.white,
    fontSize: 16,
    marginTop: 16,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 12,
    width: 24,
    height: 24,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  arrowButton: {
    marginLeft: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  statusOption: {
    ...sharedStyles.buttonBase,
    backgroundColor: colors.surfaceLight,
    marginBottom: 8,
  },
  selectedStatus: {
    backgroundColor: colors.secondary,
  },
  statusOptionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    ...sharedStyles.buttonBase,
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: colors.error,
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
  modalButtonText: sharedStyles.buttonText,
});
