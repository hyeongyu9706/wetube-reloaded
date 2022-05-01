import { Router } from "express";
import { watch,edit} from "../controllers/videoController"

const videoRouter = Router();

// const handleWatchVideo = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", watch);
videoRouter.get("/edit", edit)

export default videoRouter