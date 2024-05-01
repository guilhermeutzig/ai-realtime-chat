# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Prisma

If your app includes Prisma, make sure to run `npx prisma db push` from the root directory of your app. This command will sync your Prisma schema with your database and will generate the TypeScript types for the Prisma Client based on your schema. Note that you need to restart the TypeScript server after doing this so that it can detect the generated types.

## Authentication

This app contains Google Authentication. To setup:

1. Go to the Google Cloud Console (https://console.cloud.google.com/).
2. Select "ai-realtime-chat" project
3. Navigate to the "Credentials" section.
4. Click on "Create credentials" and choose "OAuth client ID".
5. Select the application type (Web application, Android, iOS, etc.).
6. Enter the authorized redirect URIs for your application.
   a. Locally you can use `http://localhost:3000/api/auth/callback/google`
   b. For production you will need to add the url of your app to the authorized redirect URIs
7. After creating the OAuth client ID, you will receive the client ID and client secret.
8. Paste it in the .env file as:

```
GOOGLE_CLIENT_ID="clientId"
GOOGLE_CLIENT_SECRET="clientSecret"
```

You should now be able to log in

## Next Steps

- If your app includes tRPC, check out src/pages/index.tsx and src/server/api/routers/post.ts to see how tRPC queries work.
- Have a look around the Create T3 App docs, as well as the docs of the packages that your app includes.

```

```
