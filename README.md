# to-tally-tea

creating silly puns and currency systems since 1992

## Usage

1. Read [this tutorial](https://www.devdungeon.com/content/javascript-discord-bot-tutorial).
2. `git clone` this repository to your local.
3. Run `npm install`.
4. Create a file in the root directory called `config.json` and paste your bot token in there. Do **not** commit `config.json` or share your bot token.
	
    ```
    {
      "token": "YOUR_BOT_TOKEN",
      "prefix": "YOUR_COMMAND_PREFIX_EG_&"
    }
    ```

5. Run `node app.js`.

## Developing

- [Tutorial](https://www.devdungeon.com/content/javascript-discord-bot-tutorial)
- [discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)


# Json structure (tentative)
12 points is the max and equal to 1 bubble tea,
should look into doing some conversions and purging of points when a threshold is met

{
  "user": "JD or CR",
  "totalPoints": 12, 
  "command": "add points",
  "message": "JS is a short wall",
  "points": 4
}