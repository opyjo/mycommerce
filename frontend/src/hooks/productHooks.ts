import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Products";

//The useQuery hook from the react-query library is used to fetch and manage data in a React component. It provides a declarative way to handle data fetching, caching, and state management, allowing you to easily integrate API calls into your component.

// in the below code, we are using the useQuery hook to fetch the products from the backend. The useQuery hook takes an object as an argument with two properties: queryKey and queryFn. The queryKey is used to identify the query and the queryFn is a function that returns the data. The useQuery hook returns an object with the data, isLoading, and error properties. The isLoading property is a boolean that indicates whether the query is loading or not. The error property is an error object that contains the error message if the query fails. The data property contains the data returned by the queryFn function.
export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${slug}`)).data,
  });
