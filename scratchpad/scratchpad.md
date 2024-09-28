# Things we need to keep in memory

- Table
  - Wall (draw pile, dead wall)
  - Discard pile
  - Wind x Round
- Players (x4)
  - Hand
    - Open
    - Close
  - Wallet

# Flow

1. Player draw tile from `WALL`
2. Engine checks if `BONUS TILE` is drawn. If yes...
   a. Move tile to `OPEN HAND`
   b. Draw tile from back of `WALL`
   c. Go back to (2)
3. Engine checks for possible actions
   a. Kan
   b. Ron (`HAND` is complete)
4. Player choose tile to discard (move tile to `DISCARD PILE`)
5. Other players check for possible actions
   a. Chi/Pon/Kan
   b. Ron (`HAND` is complete)

# Determining winning hands

## Possible scenarios

1. Fully closed hand
   a. Check all possible combinations
2. Mixed hand
   a. Check that minimum points have been reached

## Possible approaches

~~1. Keep track of all winning hands~~
~~a. States? (possible, live, impossible)~~
~~- Computationally too wasteful (too optimistic)~~

1. Keep track of base criterias that infer possibility of winning hand. Once criteria is matched, check for winning hands. Note: however, this will prevent special suits from being picked up
   a. Have more than a pair
   b. No orphaned number tiles (single tile with no adjacent)
   c. No orphaned honor tiles (all honor tiles must be triplets)
