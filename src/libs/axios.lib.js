const onSuccess = function (response) {
  return response.data;
};
const onError = function (error) {
  console.error("Request Failed:", error.config);
  console.error("Error Message:", error.message);

  return Promise.reject(error);
};

module.exports = {
  create: (info) => {
    let axiosConfigured = axios.create(info);
    axiosConfigured.interceptors.response.use(onSuccess, onError);
    return axiosConfigured;
  },
};
