



## Project SetupTo set up the project, ensure you have Node.js installed. You can check your Node.js version with the following command:
- https://nextjs.org/docs/app/getting-started/installation 
```sh
node -v

# projet setup : typescript, eslint, tailwind, no(for source dir), yes (for app router), no(for defautlt alias)
npx create-next-app@latest auth-tutorial --typescript --eslint --tailwind --no-src-dir --app-router

# or with selecting options interactively
npx create next-app@latest auth-tutorial
```

### Shadcn UI Setup
- website: https://ui.shadcn.com/docs/installation
To set up Shadcn UI, follow these steps:
1. Install the necessary packages:
```sh
#npm install @shadcn/ui

# Justt add the components you we need
# button : https://ui.shadcn.com/docs/components/button
npx shadcn-ui@latest add button 