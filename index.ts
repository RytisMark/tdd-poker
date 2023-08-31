export const pokerHands = [
  ["2H 3H 4H 5H 6H", "KS AS TS QS JS"],
  ["2H 3H 4H 5H 6H", "AS AD AC AH JD"],
  ["AS AH 2H AD AC", "JS JD JC JH 3D"],
  ["2S AH 2H AS AC", "JS JD JC JH AD"],
  ["2S AH 2H AS AC", "2H 3H 5H 6H 7H"],
  ["AS 3S 4S 8S 2S", "2H 3H 5H 6H 7H"],
  ["2H 3H 5H 6H 7H", "2S 3H 4H 5S 6C"],
  ["2S 3H 4H 5S 6C", "3D 4C 5H 6H 2S"],
  ["2S 3H 4H 5S 6C", "AH AC 5H 6H AS"],
  ["2S 2H 4H 5S 4C", "AH AC 5H 6H AS"],
  ["2S 2H 4H 5S 4C", "AH AC 5H 6H 7S"],
  ["6S AD 7H 4S AS", "AH AC 5H 6H 7S"],
  ["2S AH 4H 5S KC", "AH AC 5H 6H 7S"],
  ["2S 3H 6H 7S 9C", "7H 3C TH 6H 9S"],
  ["4S 5H 6H TS AC", "3S 5H 6H TS AC"],
  ["2S AH 4H 5S 6C", "AD 4C 5H 6H 2C"],
];

const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
const suites = ["S", "H", "D", "C"];

export function isValidHand(pokerHand: string) {
  const splitHand = pokerHand.split(" ");
  const valueCounts = {};
  if (splitHand.length === 5) {
    for (let hand of splitHand) {
      const value = hand[0];
      const suit = hand[1];
      if (values.includes(value) && suites.includes(suit)) {
        valueCounts[value] = (valueCounts[value] || 0) + 1;
      } else {
        throw new Error("Invalid hand!");
      }
    }

    for (let value in valueCounts) {
      if (valueCounts[value] === 5) {
        throw new Error("Invalid hand!");
      }
    }
    return true;
  } else {
    throw new Error("Invalid hand!");
  }
}

export function hasAPair(pokerHand: string) {
  const handValues = getHandValues(pokerHand);
  if (handValues.length !== new Set(handValues).size) {
    return true;
  } else {
    return false;
  }
}

export function getPairSize(pokerHand: string) {
  const handValues = getHandValues(pokerHand);
  const valueCounts = {};
  let pairSize = 0;
  handValues.forEach((value) => {
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  });

  for (let value in valueCounts) {
    if (valueCounts[value] > 1) {
      if (valueCounts[value] === 4) {
        pairSize = 6;
      } else {
        pairSize += valueCounts[value];
      }
    }
  }

  return pairSize;
}

export function getHandValues(pokerHand: string) {
  const splitHand = pokerHand.split(" ");
  const handValues: string[] = [];
  for (let hand of splitHand) {
    handValues.push(hand[0]);
  }
  return handValues;
}

export function getHandSuits(pokerHand: string) {
  const splitHand = pokerHand.split(" ");
  const handSuits: string[] = [];
  for (let hand of splitHand) {
    handSuits.push(hand[1]);
  }
  return handSuits;
}

export function isAFlush(pokerHand: string) {
  const handSuits = getHandSuits(pokerHand);
  if (new Set(handSuits).size === 1) {
    return true;
  } else {
    return false;
  }
}

export function isAStraight(pokerHand: string) {
  const handValues = getHandValues(pokerHand);
  const numericHandValues = handValues.map((value) =>
    getHandValuesNumericValue(value)
  );
  const sortedNumValues = numericHandValues.sort((a, b) => a - b);
  const highCard = getHighCard(pokerHand);
  const lowCard = getLowCard(pokerHand);
  for (let i = 0; i < sortedNumValues.length - 1; i++) {
    if (sortedNumValues[i] - sortedNumValues[i + 1] === -1) {
    } else {
      return false;
    }
  }
  return true;
}

export function getHandValuesNumericValue(value: string) {
  switch (value) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return parseInt(value);
  }
}

export function getHighCard(pokerHand: string) {
  const handValues = getHandValues(pokerHand);
  const numericHandValues = handValues.map((value) =>
    getHandValuesNumericValue(value)
  );
  return Math.max(...numericHandValues);
}

export function getLowCard(pokerHand: string) {
  const handValues = getHandValues(pokerHand);
  const numericHandValues = handValues.map((value) =>
    getHandValuesNumericValue(value)
  );
  return Math.min(...numericHandValues);
}

export function comparePokerHands(handOne: string, handTwo: string) {}
