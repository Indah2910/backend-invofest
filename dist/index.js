import express from "express";
import cors from "cors";
import eventRoute from "./routes/eventRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import pembicaraRoutes from "./routes/pembicaraRoutes.js";
import authRouter from "./routes/authRouter.js";
import userRoute from "./routes/userRouter.js";
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Ini adalah api untuk aplikasi Infovest");
});
app.use("/events", eventRoute);
app.use("/categories", categoryRoute);
app.use("/pembicara", pembicaraRoutes);
app.use("/auth", authRouter);
app.use("/user", userRoute);
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
export default app;
//# sourceMappingURL=index.js.map