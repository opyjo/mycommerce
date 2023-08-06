import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfo } from "../types/UserInfo";

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  });

//In summary, the useSignupMutation custom hook encapsulates the mutation function for user signup. When this hook is called, it will initiate the user signup process by sending a POST request to the server API with the user's name, email, and password. After a successful signup, the function will return the user information contained in the response's data property. This custom hook can be used in components to handle user signup operations and interact with the server API efficiently.
export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
        })
      ).data,
  });

// the interaction betwen the userSignupMutation and the Signup Routing is as follows:
// 1. the userSignupMutation is called in the SignupForm component
// 2. the userSignupMutation calls the apiClient.post method to send a POST request to the server API with the user's name, email, and password
// 3. the server API receives the POST request and calls the userRouter.post method to handle the request
// 4. the userRouter.post method calls the UserModel.create method to CREATE A NEW USER in the database
// 5. the UserModel.create method creates a new user in the database based on the provided user information and generates a JWT token for the user
// 6. the userRouter.post method sends the user information back to the client
// 7. the apiClient.post method receives the user information and returns it to the userSignupMutation
// 8. the userSignupMutation receives the user information and returns the user information and any other data to the component that called the hook
// 9. the SignupForm component receives the user information and updates the user state with the user information
