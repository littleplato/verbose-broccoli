# Verbose Broccoli

An intelligent email generator for outbound lead generation.

## Development

### Requirements

The project is built with `NextJS` version >13, and it is using `pnpm` as the node package manager.
Naturally, you'll need `NodeJS` version >18. I recommend to use `nvm` for NodeJS version management.

For the OpenAI's API to work, you need to add the API key as an environment variable.
Create a `.env` file at the root of the project and add the key/value.

```
OPENAI_API_KEY=your_key_here
```

### Developing on local

To develop, clone the repo and install the node dependencies

```
git clone git@github.com:weejerrick/verbose-broccoli.git
pnpm i
pnpm dev
```
