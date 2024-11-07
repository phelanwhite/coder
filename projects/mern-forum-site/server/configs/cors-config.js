import env from "./env-config.js";

export const corsConfig = {
  origin: [env.PORT.PORT_CLIENT_DEV],
  credentials: true,
};
