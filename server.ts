import { Application } from "https://deno.land/x/oak/mod.ts";
//import db from "./db.ts";
import router from "./app/routes/routes.ts";

const port = 3001;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("==>>>>>ok Server listen");
await app.listen({ port });

// Try to connect mongo databse
// db.connect();
