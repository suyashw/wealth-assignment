import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { config } from 'dotenv';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './resolvers';

// Load environment variables
config();

async function startServer() {
  try {
    // Create Apollo Server instance
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: process.env.NODE_ENV !== 'production',
      includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
    });

    // Start the server
    const port = Number(process.env.PORT) || 4000;

    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });

    console.log(`GraphQL API Gateway ready at ${url}`);
  } catch (error: any) {
    console.error('❌ Failed to start GraphQL Gateway:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Start the server
startServer();
