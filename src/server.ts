import { AppDataSource } from "./data-source";
import { app } from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 3333;

(async () => {
    await AppDataSource.initialize().catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
    app.listen(PORT, () => {
        console.log(`Server is running in http://localhost:${PORT}`);
    });
})();
