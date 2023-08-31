module.exports = { presets: ["@babel/preset-env"] };
import { expect, describe, it, test } from "@jest/globals";
import {
  pokerHands,
  isValidHand,
  comparePokerHands,
  hasAPair,
  getPairSize,
  getHandValues,
  getHandSuits,
  isAFlush,
  getHandValuesNumericValue,
  getHighCard,
  getLowCard,
  isAStraight,
} from "./index";

describe("Poker Game", () => {
  describe("isValidHand", () => {
    test("Valid hand '2H 3H 4H 5H 6H' should return true", () => {
      expect(isValidHand("2H 3H 4H 5H 6H")).toBe(true);
    });

    test("Valid hand 'AH AC 5H 6H 7S' should return true", () => {
      expect(isValidHand("AH AC 5H 6H 7S")).toBe(true);
    });

    test("Invalid hand '6H 7S' should throw an error", () => {
      expect(() => isValidHand("6H 7S")).toThrow();
    });

    test("Invalid hand 'aH AC 5H 6H 7S' should throw an error", () => {
      expect(() => isValidHand("aH AC 5H 6H 7S")).toThrow();
    });

    test("Invalid hand 'AH 1C 5H 6H 7S' should throw an error", () => {
      expect(() => isValidHand("AH 1C 5H 6H 7S")).toThrow();
    });

    test("Invalid hand 'AH AC AH AH AS' should throw an error", () => {
      expect(() => isValidHand("AH AC AH AH AS")).toThrow();
    });
  });

  describe("hasAPair", () => {
    test("Hand '2H 3H 4H 5H 6H' with no pair should return false", () => {
      expect(hasAPair("2H 3H 4H 5H 6H")).toBe(false);
    });

    test("Hand '2H 2H 4H 5H 6H' with one pair should return true", () => {
      expect(hasAPair("2H 2H 4H 5H 6H")).toBe(true);
    });

    test("Hand '2H 2H 2H 5H 6H' with three of a kind should return true", () => {
      expect(hasAPair("2H 2H 2H 5H 6H")).toBe(true);
    });
  });

  describe("getPairSize", () => {
    test("Hand '2H 3H 4H 5H 6H' with no pair should return 0", () => {
      expect(getPairSize("2H 3H 4H 5H 6H")).toBe(0);
    });

    test("Hand '2H 2H 4H 5H 6H' with one pair should return 2", () => {
      expect(getPairSize("2H 2H 4H 5H 6H")).toBe(2);
    });

    test("Hand '2H 2H 2H 5H 6H' with three of a kind should return 3", () => {
      expect(getPairSize("2H 2H 2H 5H 6H")).toBe(3);
    });

    test("Hand '2H 2H 4H 4H 6H' with two pairs should return 4", () => {
      expect(getPairSize("2H 2H 4H 4H 6H")).toBe(4);
    });

    test("Hand '2H 2H 2H 3H 3H' with full house should return 5", () => {
      expect(getPairSize("2H 2H 2H 3H 3H")).toBe(5);
    });

    test("Hand '2H 2H 2H 2H 6H' with four of a kind should return 6", () => {
      expect(getPairSize("2H 2H 2H 2H 6H")).toBe(6);
    });
  });

  describe("getHandValues", () => {
    test("Hand '2H 3H 4H 5H 6H' should return ['2', '3', '4', '5', '6']", () => {
      expect(getHandValues("2H 3H 4H 5H 6H")).toStrictEqual([
        "2",
        "3",
        "4",
        "5",
        "6",
      ]);
    });

    test("Hand '3C 2H 2H 5H 6H' should return ['3', '2', '2', '5', '6']", () => {
      expect(getHandValues("3C 2H 2H 5H 6H")).toStrictEqual([
        "3",
        "2",
        "2",
        "5",
        "6",
      ]);
    });
  });

  describe("getHandSuits", () => {
    test("Hand '2H 3H 4H 5H 6H' should return ['H', 'H', 'H', 'H', 'H']", () => {
      expect(getHandSuits("2H 3H 4H 5H 6H")).toStrictEqual([
        "H",
        "H",
        "H",
        "H",
        "H",
      ]);
    });

    test("Hand '3C 2H 2H 5H 6H' should return ['C', 'H', 'H', 'H', 'H']", () => {
      expect(getHandSuits("3C 2H 2H 5H 6H")).toStrictEqual([
        "C",
        "H",
        "H",
        "H",
        "H",
      ]);
    });
  });

  describe("isAFlush", () => {
    test("Hand '2H 2H 4C 5S 6D' with no flush should return false", () => {
      expect(isAFlush("2H 2H 4C 5S 6D")).toBe(false);
    });

    test("Hand '2H 2H 2H 5H 6H' with a flush should return true", () => {
      expect(isAFlush("2H 2H 2H 5H 6H")).toBe(true);
    });
  });

  describe("getHandValuesNumericValue", () => {
    test("Hand value '2' should return 2", () => {
      expect(getHandValuesNumericValue("2")).toBe(2);
    });

    test("Hand value 'T' should return 10", () => {
      expect(getHandValuesNumericValue("T")).toBe(10);
    });

    test("Hand value 'J' should return 11", () => {
      expect(getHandValuesNumericValue("J")).toBe(11);
    });

    test("Hand value 'Q' should return 12", () => {
      expect(getHandValuesNumericValue("Q")).toBe(12);
    });

    test("Hand value 'K' should return 13", () => {
      expect(getHandValuesNumericValue("K")).toBe(13);
    });

    test("Hand value 'A' should return 14", () => {
      expect(getHandValuesNumericValue("A")).toBe(14);
    });
  });

  describe("getHighCard", () => {
    test("Hand '2H 5H 6C 9S AD' should return 14", () => {
      expect(getHighCard("2H 5H 6C 9S AD")).toBe(14);
    });
  });

  describe("getLowCard", () => {
    test("Hand '2H 5H 6C 9S AD' should return 2", () => {
      expect(getLowCard("2H 5H 6C 9S AD")).toBe(2);
    });
  });

  describe("isAStraight", () => {
    test("Hand '2H 6H 7C 8S 9D' should return false", () => {
      expect(isAStraight("2H 6H 7C 8S 9D")).toBe(false);
    });

    test("Hand '2H 3H 4C 5S 6D' should return true", () => {
      expect(isAStraight("2H 3H 4C 5S 6D")).toBe(true);
    });

    test("Hand '5H 6H 7C 8S 9D' should return true", () => {
      expect(isAStraight("5H 6H 7C 8S 9D")).toBe(true);
    });

    test("Hand 'AH 2H 3C 4S 5D' should return true", () => {
      expect(isAStraight("AH 2H 3C 4S 5D")).toBe(true);
    });
  });

  describe("comparePokerHands", () => {
    test.skip("Flush played against a higher value flush should return -1", () => {
      expect(comparePokerHands(pokerHands[0][0], pokerHands[0][1])).toBe(-1);
    });

    test.skip("Straight flush played against four of a kind should return 1", () => {
      expect(comparePokerHands(pokerHands[1][0], pokerHands[1][1])).toBe(1);
    });
  });
});
