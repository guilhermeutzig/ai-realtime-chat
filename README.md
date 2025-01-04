# AI Real-time Chat (Discontinued)

### Project Status

This project has been discontinued due to technical and infrastructure limitations encountered during development:

- The Pusher service, while powerful for real-time communication, proved cost-prohibitive for this project's scope. Its free tier limitations were too restrictive for meaningful development.
- Alternative solutions were explored:
  - Socket.io would have been ideal but lacks compatibility with Vercel hosting
  - A Heroku + Socket.io combination was considered but the removal of Heroku's free tier made this unfeasible
  - Attempts to implement tRPC Sockets faced significant technical challenges that would have required substantial additional development time

The learnings from this project have been valuable and may inform future iterations with different technical approaches.

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
