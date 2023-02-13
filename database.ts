import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

export const client = new MongoClient();

try {
  await client.connect("mongodb://localhost:27017/coumon");
} catch (e) {
  console.error(e);
  throw e;
}
