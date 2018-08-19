export const code = 1;
export const stdout = `
  1
    -  1-1
    -  1-2
  1-before
    -  1-notonly-1
  1-beforeEach
    ✓  1-only-1 (ELAPSED ms)
  1-afterEach
  1-beforeEach
    ✓  1-only-2 (ELAPSED ms)
  1-afterEach
    2
    3
      -  3-1
      -  3-2
      3-before
      -  3-notonly-1
      3-beforeEach
      ✓  3-only-1 (ELAPSED ms)
      3-afterEach
      3-beforeEach
      ✓  3-only-2 (ELAPSED ms)
      3-afterEach
      4
      5
        -  5
      3-after
  1-after

  4 passing (ELAPSED ms)
  7 pending
`;
export const stderr = ``;
