const getErrorMessage = (error) => {
  const validation = error.response?.data?.errors;
  if (validation?.length) {
    return validation.map((item) => item.message).join(", ");
  }

  return error.response?.data?.message || error.message || "Something went wrong";
};

export default getErrorMessage;
