import { Server } from "https://deno.land/std@0.177.0/http/server.ts";
import { GraphQLHTTP } from "https://deno.land/x/gql@1.2.0/mod.ts";
import { makeExecutableSchema } from "https://esm.sh/@graphql-tools/schema@9.0.16";
import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./typedefs.ts";

const schema = makeExecutableSchema({ resolvers, typeDefs });

const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request>({
        schema,
        graphiql: true,
      })(req)
      : new Response("Not found", { status: 404 });
  },
  port: 3000,
});

server.listenAndServe();
