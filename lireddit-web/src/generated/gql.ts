/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation Login($options: UsernamePasswordInput!) {\n  login(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      username\n      id\n    }\n  }\n}": types.LoginDocument,
    "mutation Register($username: String!, $password: String!) {\n  register(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      username\n      id\n    }\n  }\n}": types.RegisterDocument,
    "query Me {\n  me {\n    id\n    username\n  }\n}": types.MeDocument,
};

export function graphql(source: "mutation Login($options: UsernamePasswordInput!) {\n  login(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      username\n      id\n    }\n  }\n}"): (typeof documents)["mutation Login($options: UsernamePasswordInput!) {\n  login(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      username\n      id\n    }\n  }\n}"];
export function graphql(source: "mutation Register($username: String!, $password: String!) {\n  register(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      username\n      id\n    }\n  }\n}"): (typeof documents)["mutation Register($username: String!, $password: String!) {\n  register(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      username\n      id\n    }\n  }\n}"];
export function graphql(source: "query Me {\n  me {\n    id\n    username\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    username\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;