import env from "@/configs/env-config";
import io from "socket.io-client";
export const socket = io(env.PORT_SERVER_SOCKETIO);
