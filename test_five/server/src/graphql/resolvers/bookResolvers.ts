import { Resolver, Query } from "type-graphql";

@Resolver()
export default class BookResolver {
  @Query(() => String)
  hello() {
    return "world";
  }
}