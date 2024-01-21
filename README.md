# Liquid
Liquid is a Web3 version of Linktree with on-chain features. You can create your social profile easily, and it will provide personalized badges to your profile based on your on-chain activities. You can flex your social profile with your audience by sharing a profile link, and you can receive tips directly in your wallet. It makes socialism easy and transparent for everyone. 

## Prerequisites & Manual Setup

Every user must have a EOA wallet to interact with this product. Check out how to create a wallet from [here](https://metamask.io). 

Follow the instructions for the local environment: The user must have Node.js and npm to run this platform locally. Just download Node.js from [here](https://nodejs.org/en/download/).

### Local Setup Instructions

**Clone the repo via CLI:**

```sh
git clone https://github.com/neel-ds/liquid.git 
cd liquid
```

**Install the required packages:**

```sh
npm install
yarn install   #or
pnpm install   #or
```

**Add required environment variables mentioned in `.env.example` file**

```sh
touch .env.local  #Paste env variables in this file and your values
```

**In the project directory, you can run:**

```sh
npm run dev
yarn dev   #or
pnpm dev   #or
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
