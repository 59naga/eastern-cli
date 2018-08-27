import delay from "delay";

setOptions({ concurrency: 1 });
describe("1", (it, describe) => {
  it.before(() => {
    console.log("  1-before");
  });
  it.beforeEach(() => {
    console.log("  1-beforeEach");
  });
  it.afterEach(() => {
    console.log("  1-afterEach");
  });
  it.after(() => {
    console.log("  1-after");
  });

  it("1-1");
  it.skip("1-2");
  it("1-notonly-1", () => {});
  it.only("1-only-1", async () => {
    await delay(5);
  });
  it.only("1-only-2", async () => {
    await delay(5);
  });

  describe("2");
  describe("3", (it, describe) => {
    it.before(() => {
      console.log("      3-before");
    });
    it.beforeEach(() => {
      console.log("      3-beforeEach");
    });
    it.afterEach(() => {
      console.log("      3-afterEach");
    });
    it.after(() => {
      console.log("      3-after");
    });

    it("3-1");
    it.skip("3-2");
    it("3-notonly-1", () => {});
    it.only("3-only-1", async () => {
      await delay(5);
    });
    it.only("3-only-2", async () => {
      await delay(5);
    });

    describe("4");
    describe("5", it => {
      it("5");
    });
  });
});
