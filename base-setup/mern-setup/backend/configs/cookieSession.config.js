import cookieSession from "cookie-session";

const cookieSessionConfig = cookieSession({
  name: "session",
  keys: ["lama"],
  maxAge: 24 * 60 * 60 * 100,
});

export default cookieSessionConfig;
