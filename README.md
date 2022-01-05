# Blogo

## Table of Contents

<details>
<summary>Click to expand</summary>
  
- [Introduction](#introduction)  
  s
- [Stack](#stack)

- [Environment Variables](#environment-variables)

- [Run locally](#run-locally)

- [Credits](#credits)

</details>

## Introduction

[Blogo](https://remix-crud.vercel.app/) is a simple `CRUD` remix application where users are able to login/register, create posts, view posts, edit posts, delete posts. I used `Remix` paired with `zod` and `prisma` for majority of backend work, with prisma I went with `mongodb` connector (preview feature), for styling I used `tailwindcss`.

## Stack

- `Typescript` 💕
- `Remix` 💿
- `Prisma` 📜
- `Tailwindcss` for styling 👌
- `radix-ui` for accessible dropdown component 👓
- `zod` for validation ❌✔

## Environment variables

| Name           | Description              | Example                                                                                               |
| -------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| SESSION_SECRET | can be anything          | `verysecret`                                                                                          |
| DATABASE_URL   | db connection url string | `mongodb+srv://username:password@cluster0.riogn.mongodb.net/databasename?retryWrites=true&w=majority` |

## Run locally

- Clone to your computer.

  - `clone this repo`

  - `cd remix-crud`

  - `npm install`

- Create .env.local in the root directory of your project, add env variables required.

- Start a dev server

  - `npm run dev`

## Credits

- Favicon and meta images

  - [lukaszadam](https://lukaszadam.com/illustrations)
