package pl.kolendateam.dadcard.classCharacter.entity;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Dices {

  public int throwDices(int numberDice, DicesEnum dice) {
    int res = 0;

    for (int t = 1; t < numberDice; t++) {
      res += diceResultat(dice);
    }

    return res;
  }

  public int getRandomNumber(int min, int max) {
    return (int) ((Math.random() * (max - min)) + min);
  }

  public int diceResultat(DicesEnum dice) {
    int res =
      switch (dice) {
        case D2 -> getRandomNumber(1, 2);
        case D3 -> getRandomNumber(1, 3);
        case D4 -> getRandomNumber(1, 4);
        case D6 -> getRandomNumber(1, 6);
        case D8 -> getRandomNumber(1, 8);
        case D10 -> getRandomNumber(1, 10);
        case D12 -> getRandomNumber(1, 12);
        case D20 -> getRandomNumber(1, 20);
        case D100 -> getRandomNumber(1, 100);
        default -> 1;
      };

    return res;
  }
}
