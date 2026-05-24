export const getConfig = (type = "json") => {
  const token = localStorage.getItem("token"); // dynamically read token

  return {
    headers: {
      "Content-Type": type === "form" ? "multipart/form-data" : "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // attach token if exists
    },
    
  };
};
