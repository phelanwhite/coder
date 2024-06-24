import cors from "cors";

const corsConfig = cors({
  credentials: true,
  origin: [`http://localhost:3000`],
});
export default corsConfig;
