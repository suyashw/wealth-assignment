import { GraphQLError } from 'graphql';
import { restClientService } from '../services/rest-client.service';

export const assetResolvers = {
  Query: {
    // Get single asset by ID
    asset: async (_parent: any, { id }: { id: string }) => {
      try {
        console.log(`Resolving asset query for ID: ${id}`);
        return await restClientService.getAssetById(id);
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null; // Return null for not found, GraphQL will handle this gracefully
        }
        console.log(`Failed to fetch asset ${id}`, error.message);
        throw new GraphQLError('Failed to fetch asset', {
          extensions: { code: 'INTERNAL_ERROR' }
        });
      }
    },

    // Point-in-time query for historical data
    assetsAsOf: async (_parent: any, args: { date: string; cognitoId?: string }) => {
      try {
        console.log('Resolving assetsAsOf query', args);
        return await restClientService.getAssetsAsOf(args);
      } catch (error: any) {
        console.log('Failed to fetch assets as of date', error.message);
        throw new GraphQLError('Failed to fetch historical assets', {
          extensions: { code: 'INTERNAL_ERROR' }
        });
      }
    },
  },

  Mutation: {
    // Create a new asset
    createAsset: async (_parent: any, { input }: { input: any }) => {
      try {
        console.log('Creating new asset', { nickname: input.nickname });
        return await restClientService.createAsset(input);
      } catch (error: any) {
        console.log('Failed to create asset', error.message);
        throw new GraphQLError('Failed to create asset', {
          extensions: { 
            code: 'BAD_REQUEST',
            details: error.response?.data?.message || error.message
          }
        });
      }
    },
  },
};
