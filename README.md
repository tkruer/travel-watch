# travel-watch

## Description

This is a simple script that I built in a few hours to help me keep a running log of hotel and flight prices for my honeymoon. The code itself is pretty straightforward with minimal dependencies. A quick overview is below:

- TypeScript (Not my first choice but better than JS)
- SQLite (Turso, ngl is pretty easy to use and generously free)
- DrizzleORM (Prisma is great but Drizzle is a lot more lightweight and quicker to get started with)

Right now, the script is pretty barebones. I can't find flights for that far out so I'll come back to this in a few months. I'll probably add a few more features like a CLI and a web interface, but for now, it's just a script. The more data I collect over the year will determine what I can build with this. If there is desire to support more destinations, hotel chains, or etc, open an Issue and I'll be open to chatting about it. No clue where this will go right now, but I'm excited to see what happens.

## Installation & Usage

The .env.example file is left blank for obvious reasons. Turso makes it pretty easy to do all of this and you don't have to add in slack logging unless desired. You'll need to create a .env file with the following variables:

```bash
TURSO_DB_URL=""
TURSO_DB_TOKEN=""
SLACK_WEBHOOK_URL=""
```

Bun runtime for TypeScript is pretty goated. It's fast and easy to use. I'd recommend using it for this project. You can install it with the following command:

```bash
npm install -g bun
```

Once you have Bun installed, you can run the script with the following command:

```bash
bun index.ts
```

You can also run it from the Dockerfile if you'd like.
    
```bash
docker build -t travel-watch .
docker run -it travel-watch
```

Everything else should be pretty self-explanatory. If you have any questions, feel free to reach out to me on Twitter @tkszn_.
