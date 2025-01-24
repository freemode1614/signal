import { describe, expect, test, vi } from "vitest";

import { createSignal } from "@/index";

describe("Test case", () => {
  test("Test Case One", () => {
    const fn = vi.fn(() => {
      //
    });
    const signal = createSignal(9);
    signal.subscribe(fn);
    expect(signal.get()).toEqual(9);
    signal.value = 10;
    expect(signal.get()).toEqual(10);
    expect(fn).toBeCalledTimes(1);
  });
});
