import delay from "delay";

describe("1", ({ before, beforeEach, afterEach, after, it, describe }) => {
  before(() => {
    console.log("  1-before");
  });
  beforeEach(() => {
    console.log("  1-beforeEach");
  });
  afterEach(() => {
    console.log("  1-afterEach");
  });
  after(() => {
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
  describe("3", ({ before, beforeEach, afterEach, after, it, describe }) => {
    before(() => {
      console.log("      3-before");
    });
    beforeEach(() => {
      console.log("      3-beforeEach");
    });
    afterEach(() => {
      console.log("      3-afterEach");
    });
    after(() => {
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
