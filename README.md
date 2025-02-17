# Turborepo template

## Apps and Packages
```
- `web`: [Next.js](https://nextjs.org/) app
- `@repo/db`: prisma db setup
- `@repo/ui`: a stub React component library shared by both `admin` and `web` applications
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### packages/db/.env
`DATABASE_URL`

#### apps/web/.env
`BASE_URL`

#### apps/admin/.env
`BASE_URL`
`RESEND_API_KEY`
`RESEND_EMAIL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/todayweb/turbo-template.git
```

Go to the project directory

```bash
  cd turbo-template
```

Install turbo

```bash
  npm install turbo --global
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  turbo dev --filter=admin
```
```bash
  turbo dev --filter=web
```

## Authors

- [@l0st0](https://github.com/l0st0)


