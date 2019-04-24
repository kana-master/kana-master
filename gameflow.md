# Gameflow

## Game Logic

The selected level starts and presents the user a random syllable (Hiragana / Katakana) as well as four possible answers.
The available syllables depend on the selected level.

If the correct answer was selected, the game immediately goes to the next syllable.

If a wrong answer was selected, the game shows a quick indicator that something was wrong, removes a heart container and then goes to the next syllable.

If the required amount of syllables have been answered, the game navigates to the success screen and informs the player how many gems / jewels they won as well as if they unlocked new things like syllables.

If the user runs out of heart containers the game navigates to the failure screen.

## Game Segments

**Syllable**

A single piece of gameplay in which the player has to select the correct counterpart for a given syllable in latin character.

**Level**

A collection of syllables the user has to complete. At the end of the level the user will be awarded in the form of gems.

**Gems / Jewels**

Will be rewarded on completion of a level, no matter if the user succeeded or failed.
Can be used to buy upgrades in the gems / jewels store. In this way the player can ease the growing complexity / difficulty of newly unlocked levels.

**Heart Container**

Represents the amount of wrong answers a user is allowed to give per level. Will be refilled on start of a new level. Initially, three heart containers are given.

**Upgrades**

- Additional heart containers
- New and more valuable gems / jewels
- Increased maximum time per syllable question

## Level Object

A level object provides all the data needed to run the game logic.

```
{
  /*
   * Identifier of the current Level.
   * Represents the actual level the user selected.
   */
  id: 1,

  /*
   * The amount of syllables the user has to answer
   * in order to win the selected level.
   */
  sylllablesToSolve: 20,

  /*
   * Available Syllables for the selected level.
   */
  availableSyllables: ['あ', 'い', 'う', 'え', 'お'],
}
```
