import { a } from "@tiagonapoli/test-pkg-a";
import { b } from "@tiagonapoli/test-pkg-b";

console.log("IMPORT DE A", a);
console.log("IMPORT DE B", b);

test('true', () => {
    expect(true).toBe(true)
})