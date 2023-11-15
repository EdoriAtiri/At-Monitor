const formatDate = (inputDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(inputDate).toLocaleDateString("en-GB", options);
};

export default formatDate;
