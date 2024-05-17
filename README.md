# AI Real-time Chat

### Stack

- [Bun](https://bun.sh)
- [Next.js](https://nextjs.org)
- [Typescript](https://www.typescriptlang.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Supabase](https://supabase.io)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [tRPC](https://trpc.io)
- [Sentry](https://sentry.io)
- [Pusher](https://pusher.com)

## Installation

1. Install [Bun](https://bun.sh)
2. You'll need to configure `.env` file based on `.env.example`
3. Run `bun install`
4. Run `bun dev` to start the development server

## What is it

This project is an AI real-time chat, where users can create accounts, join chat rooms, and exchange messages in real-time. The application should have features like user authentication, message history, and real-time updates.

### Key features

1. **User Authentication**: Allows users to securely create accounts and log in using Supabase.
2. **Chat Rooms**: Enables users to communicate with others by creating or joining chat rooms.
3. **Real-time Messaging**: Employs tRPC for instant message delivery through real-time message handling.
4. **Message History**: Provides users with message history by storing chat messages in a Prisma database.
5. **UI Components**: Utilizes shadcn/ui to build a modern and responsive user interface for the chat application.
