import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

const client = async () => {
  const client = new MongoClient();
  const URI = "mongodb://127.0.0.1:27017";
  await client.connect(URI);
  return client;
};

const allTemplateRules = async (args: any) => {
  const mongo = await client();
  const db = mongo.database("coumon");
  const laws = db.collection("laws");
  return await laws.find(args).toArray();
};

export const resolvers = {
  Query: {
    allTemplateRules: () =>
      allTemplateRules({ prosecutor: "graphiteProsecutor", deleted: false }),
  },
  TemplateRule: {
    param: (parent: any, filter: any) => {
      return filter.name === undefined
        ? parent.param
        : parent.param.filter((param: any) => param.name === filter.name);
    },
  },
};
