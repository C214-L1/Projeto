export type CreateUserBodyType = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
};
