/*
 * @format
 */

import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { User } from "src/entities";

export type TResolverFunc<T = unknown> = (
  parent: any,
  args: any,
  context: { user: User; [name: string]: any } & T,
  info: any
) => any;

export interface IResolvers {
  [name: string]: TResolverFunc | IResolvers | string | number;
}

export const ensureUser = (func: TResolverFunc): TResolverFunc => (
  obj,
  args,
  context,
  info
) => {
  if (!context.user) {
    throw new AuthenticationError("invalid token");
  }
  return func(obj, args, context, info);
};

export const ensureResource = (
  Resource: typeof User,
  func: TResolverFunc,
  relations: string[] = []
): TResolverFunc => async (obj, args, context, info) => {
  const resource = await Resource.findOne(args.id, { relations });
  if (!resource) {
    throw new ForbiddenError("not found resource");
  }

  return func(obj, args, { ...context, resource }, info);
};
