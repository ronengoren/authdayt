import { environmentTypes } from "src/vars/enums";

const isDevEnv =
  !process.env.ENV || process.env.ENV === environmentTypes.DEVELOPMENT;

export { isDevEnv }; // eslint-disable-line import/prefer-default-export
