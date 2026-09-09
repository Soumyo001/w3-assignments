import e from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = e();
app.use(e.json());
app.use(e.static(path.join(__dirname, "public")));

export default app;