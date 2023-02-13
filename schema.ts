export const typeDefs = `
type Query {
  graphiteTemplateRules: [TemplateRule]
  rulesByTemplateId(_id: ID!): [Rule]
}

type Param {
  name: String
  value: String
}

type TemplateRule {
  _id: ID!
  name: String
  prosecutor: String
  param(name: String): [Param]
  rules: [Rule]
}

type Role {
  _id: ID!
  cmdbId: String
  name: String
}

type Rule {
  _id: ID!
  law: TemplateRule
  role: Role
  # parameters: ?? 
}
`;
