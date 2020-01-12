import { checkAuthCall } from "../drivers/User/user.driver";

const checkAuth = async () => {
  // Authenticate user
  const access = await checkAuthCall();
  if (!access.error) {
    return true;
  } else {
    return false;
  }
};

export default checkAuth;
