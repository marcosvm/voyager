import { client } from "./database.ts";

export const resolvers = {
  Query: {
    graphiteTemplateRules: () => {
      const laws = client.database().collection("laws").find({
        prosecutor: "graphiteProsecutor",
      }).toArray();
      return laws;
    },
    rulesByTemplateId: (filter: string) => {
      return client.database().collection("rules").find({
        law: filter,
        deleted: false,
      }).toArray();
    },
  },
  TemplateRule: {
    param: (parent: any, filter: any) => {
      return filter === undefined
        ? parent.param
        : parent.param.filter((param: any) => param.name === filter.name);
    },
    rules: (parent: any) => {
      return client.database().collection("rules").find({
        law_id: parent._id,
        deleted: false,
      }).toArray();
    },
  },
  Rule: {
    role: (parent: any) => {
      return client.database().collection("roles").findOne({
        _id: parent.role_id,
      });
    },
  },
};
