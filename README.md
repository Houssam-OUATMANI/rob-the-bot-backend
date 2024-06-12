

# Rob The Bot Backend

This project is an Express backend that communicates with Ollama models. The app is built using Bun as the dependency manager.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Development](#development)

## Installation

First, ensure that you have Bun installed. If you don't have Bun installed, you can install it by following the instructions on the [Bun website](https://bun.sh/).

Clone the repository:

```bash
git clone https://github.com/Houssam-OUATMANI/rob-the-bot-backend.git
cd rob-the-bot-backend
```

Install the dependencies:

```bash
bun install
```

## Environment Variables

There is a `.env.example` file in the root directory of the project. Rename this file to `.env`:

```bash
mv .env.example .env
```

You can modify the environment variables in the `.env` file as needed.

## Development

To run the app in development mode, use the following command:

```bash
bun  dev
```
This will start the development server on the port specified in your `.env` file (default is `8081`).
