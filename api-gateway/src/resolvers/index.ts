import { assetResolvers } from './asset.resolvers';

export const resolvers = {
  Query: {
    ...assetResolvers.Query,
  },
  Mutation: {
    ...assetResolvers.Mutation,
  },
};
