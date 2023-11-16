export const formatDateDisplay = (inputDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(inputDate).toLocaleDateString("en-GB", options);
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Extract yyyy-mm-dd
};
