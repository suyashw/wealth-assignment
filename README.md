This Assignment implements a backend system for asset management with separation of concerns, featuring a GraphQL API gateway and a NestJS service with MongoDB.

## Architecture

- **NestJS Service** (`/asset-management-service`): Business logic service with MongoDB and TypeORM
- **GraphQL Gateway** (`/api-gateway`): Standalone Apollo Server for GraphQL API

### Prerequisites
- Node.js 20.x
- MongoDB instance running locally

### Installation
1. Install dependencies:
```bash
nvm use 20
cd asset-management-service
npm run install

cd api-gateway
npm run install
```

2. Configure environment variables (current setup not needed, already configured, update ports if necessary)

#### Run services in separate terminals

Terminal 1 - NestJS Service:
```bash
cd asset-management-service
npm run start:dev
```


Terminal 2 - GraphQL Gateway:
```bash
cd api-gateway  
npm run dev
```

## API Endpoints

- **GraphQL Gateway**: http://localhost:4000/graphql
- **NestJS Service**: http://localhost:3000

## GraphQL Schema

The GraphQL API provides the following operations:
### Queries
- `asset(id: ID!)`: Get asset by ID
- `assetsAsOf(date: String!)`: Get all assets as of a specific date (historical point-in-time query)
### Mutations
- `createAsset(input: CreateAssetInput!)`: Create a new asset

## Database Design
### Asset Collection
Main collection storing current asset state with denormalized frequently-accessed data.
### AssetHistory Collection  
Time-series collection for historical balance tracking, optimized for point-in-time queries.



## Design Decisions
1. **Separate GraphQL Gateway**: Provides API flexibility and allows NestJS service to focus on business logic
2. **MongoDB with TypeORM**: Leverages MongoDB's flexibility for complex asset data while maintaining type safety
3. **Separation of Concerns**: Clear boundaries between API, business logic, and data layers


## Trade-offs and Limitations
1. **Storage**: Historical data increases storage requirements
2. **Complexity**: Additional complexity for maintaining historical records
3. **Consistency**: Eventual consistency between current and historical data
4. **Time Constraint**: Advanced validation, ignored non-functional fields from the assets.json for better focus on key functionality, adding caching for histories of any asset etc.