import { checkAuthCall } from "./drivers/User/user.driver";

const checkAuth = async () => {
  return checkAuthCall()
    .then(res => res)
    .catch(error => console.warn(error));
};

export const fetchData = () => {
  const authPromise = checkAuth();
  return {
    user: wrapPromise(authPromise)
  };
};

const wrapPromise = promise => {
  // Set initial status
  let status = "pending";
  // Store result
  let result;
  // Wait for promise
  let suspender = promise.then(
    res => {
      (status = "success"), (result = res);
    },
    err => {
      (status = "error"), (result = err);
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
};
