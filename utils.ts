import { ToDoStatusSchema } from "./client/api/types/schemas";

export const getStatusColor = (status: typeof ToDoStatusSchema._type) => {
  switch (status) {
    case "PENDING":
      return "#FFA500";
    case "IN_PROGRESS":
      return "#4169E1";
    case "COMPLETED":
      return "#32CD32";
    default:
      return "#808080";
  }
};

export const formatStatus = (status: typeof ToDoStatusSchema._type) => {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "IN_PROGRESS":
      return "In progress";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
};
