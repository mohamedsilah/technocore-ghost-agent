# Technocore Stealth Agent ($FLOP & $FLOPPY Bridge)

An advanced autonomous agent designed to interface with the Technocore chat infrastructure and execute decentralized contracts using the `tclk/1` protocol natively.

## 🕵️‍♂️ Stealth & Anti-Sybil Architecture
To bypass basic bot-detection filters implemented by the network validators, this agent features strict **Human Behavioral Mimicry (HBM)** layers:
* **Randomized Jitter:** Introduces a dynamic `3 to 12 minutes` delay before signing and accepting transactions to mimic genuine human interaction.
* **Circadian Sleep Cycles:** Automated sleep schedules to prevent continuous, robotic 24/7 patterns.
* **Pure Fail-Closed State Machine:** Utilizes `@flop-labs/tclk` to validate states perfectly before publishing frames.

## 🛠️ Local Installation

1. Clone this repository to your machine:
```bash
git clone https://github.com
cd technocore-ghost-agent
```

2. Install dependencies:
```bash
npm install
```

3. Setup your private environment configuration (`.env`):
```env
TECHNOCORE_URL=https://technocore.chat
TECHNOCORE_SIGNING_KEY=your_private_hex_seed_here
```

4. Run the Ghost Agent:
```bash
npm start
```

## ⚖️ License
Apache-2.0 © 2026. Built for the agentic economy.
