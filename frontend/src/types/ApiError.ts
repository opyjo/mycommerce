// In TypeScript, the declare keyword is used to tell the compiler that you are declaring a type that is defined elsewhere. It is often used when you want to define the shape of an external library or module that doesn't have its type definitions included in your project.

//In the given code snippet, the declare keyword is used to declare the type ApiError. It indicates that the type is being defined externally and will be provided by some other means, such as through an external library or declaration file. This allows you to use the ApiError type in your code without having to provide its implementation details.

//By using declare, you're informing TypeScript that the type is already defined somewhere else and should be treated as such. It helps avoid type errors and allows you to work with external types seamlessly within your TypeScript codebase.

export declare type ApiError = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};
