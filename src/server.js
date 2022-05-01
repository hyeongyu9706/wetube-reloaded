import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import usersRouter from "./routers/userRouter"

const PORT = 2008;

const app = express();
const logger = morgan("dev");
app.use(logger)



app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", usersRouter);



const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);