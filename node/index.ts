import { a } from "@tiagonapoli/test-pkg-a";
import { b } from "@tiagonapoli/test-pkg-b";
import { Service, ServiceContext } from "@vtex/api";

console.log("IMPORT DE A", a);
console.log("IMPORT DE B", b);

export default new Service({
  routes: {
    test: (ctx: ServiceContext) => {
      ctx.body = "test";
      ctx.status = 200;
    }
  }
});
