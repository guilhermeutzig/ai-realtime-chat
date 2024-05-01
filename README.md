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

If your app includes NextAuth.js, we get you started with the DiscordProvider. This is one of the simplest providers that NextAuth.js offers, but it still requires a bit of initial setup on your part.

Of course, if you prefer to use a different auth provider, you can also use one of the many providers↗ that NextAuth.js offers.

1. You will need a Discord account, so register one if you haven’t already.
2. Navigate to https://discord.com/developers/applications↗ and click “New Application” in the top right corner. Give your application a name and agree to the Terms of Service.
3. Once your application has been created, navigate to “Settings → OAuth2 → General”.
4. Copy the “Client ID” and add it to your .env as DISCORD_CLIENT_ID.
5. Click “Reset Secret”, copy the new secret, and add it to your .env as DISCORD_CLIENT_SECRET.
6. Click “Add Redirect” and type in http://localhost:3000/api/auth/callback/discord.
   a. For production deployment, follow the previous steps to create another Discord Application, but this time replace http://localhost:3000 with the URL that you are deploying to.
7. Save Changes.
8. Set the NEXTAUTH_SECRET in .env. In development any string will work, for production see the note in .env on generating a secure secret.

You should now be able to log in

## Next Steps

- If your app includes tRPC, check out src/pages/index.tsx and src/server/api/routers/post.ts to see how tRPC queries work.
- Have a look around the Create T3 App docs, as well as the docs of the packages that your app includes.
