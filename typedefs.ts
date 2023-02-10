import { gql } from "https://deno.land/x/graphql_tag@0.1.0/mod.ts";

export const typeDefs = gql`
  type Query {
    allTemplateRules: [TemplateRule]
  }

  type Param {
    name: String
    value: String
  }

  type TemplateRule {
    name: String
    prosecutor: String
    param(name: String): [Param]
  }
`;
