/**
 * This file will be the entrypoint of our resolvers
 * custom resolvers are modularized depending on their types
 *
 * https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
 */

 import { GraphQLScalarType } from 'graphql';
 import { Kind } from 'graphql/language';
 import { IResolvers } from 'graphql-tools';
 import { merge } from 'lodash';
 import { debug } from 'debug';
import { User } from './users';
import { Request } from 'express';
 
 const graphqlLogger = debug('app:Graphql-Resolvers');
 graphqlLogger.log = console.log.bind(console);
 
 export const logger = graphqlLogger;
 


 export interface IGraphQlSchemaContext {
   lang?: string | undefined | null;
   req: Request;
   user: User | undefined
 }
 
 export const appResolvers: IResolvers<any, IGraphQlSchemaContext> = {
 
 /*
 http://dev.apollodata.com/tools/graphql-tools/resolvers.html
  
 Resolver function signature:
 fieldName(obj, args, context, info) { result }
  
 obj: The object that contains the result returned from the
 resolver on the parent field, or, in the case of a top-level
 Query field, the rootValue passed from the server configuration.
 This argument enables the nested nature of GraphQL queries.
  
 const graphqlLogger = debug('app:Graphql-Resolvers');
 graphqlLogger.log = console.log.bind(console);
  
 export const logger = graphqlLogger;
  
 export interface IGraphQlSchemaContext {
 CommentService: typeof CommentService;
 FeedService: typeof FeedService;
 NewsItemService: typeof NewsItemService;
 UserService: typeof UserService;
 userId: string | undefined;
 user: UserModel | null | undefined;
 lang?: string | undefined | null;
 req: any
 }
  
 export const appResolvers: IResolvers<any, IGraphQlSchemaContext> = {
  
 /*
 http://dev.apollodata.com/tools/graphql-tools/resolvers.html
  
 Resolver function signature:
 fieldName(obj, args, context, info) { result }
  
 obj: The object that contains the result returned from the
 resolver on the parent field, or, in the case of a top-level
 Query field, the rootValue passed from the server configuration.
 This argument enables the nested nature of GraphQL queries.
  
 context: This is an object shared by all resolvers in a particular
 query, and is used to contain per-request state, including
 authentication information, dataloader instances, and anything
 else that should be taken into account when resolving the query
 */
 
   /*          QUERY RESOLVERS        */
 
   Query: {
 
     getInspired(_, __, context) {

      // if(!context.user) throw Error("Sorry, We cannot inspire an anonymous user!");
      console.log('user', context.user);
      
       return {
        id: 10,
        creationTime: 1664275853750,
        author: "Winner",
        quote: "Be the change you wanna see, own your work!"
       }
     }
   },
 
   /*       CUSTOM DATE RESOLVER       */
   Date: new GraphQLScalarType({
     // http://dev.apollodata.com/tools/graphql-tools/scalars.html#Date-as-a-scalar
     name: 'Date',
     description:
       'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
     parseValue(value): number {
       // Turn an input into a date which we want as a number
       // value from the client
       return new Date(value).valueOf();
     },
     serialize(value): number {
       // Convert Date to number primitive .getTime() or .valueOf()
       // value sent to the client
       return value instanceof Date ? value.valueOf() : value;
     },
     parseLiteral(ast): number | null {
       // ast value is always in string format
       // parseInt turns a string number into number of a certain base
       return ast.kind === Kind.INT ? parseInt(ast.value, 10) : null;
     },
   }),
   Any: new GraphQLScalarType({
     name: 'Any',
     description: 'Any type',
     serialize(value) {
       return value;
     },
     parseValue(value) {
       return value;
     },
     parseLiteral(ast: any) {
       return ast.value;
     },
   }),
 };
 
 export const resolvers: IResolvers<any, IGraphQlSchemaContext> = merge(
   {},
   appResolvers,
 );
 