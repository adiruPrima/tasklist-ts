# TaskList

A simple, lightweight task management application built with React. TaskList helps you organize your tasks with priority levels and marking capabilities.

## Features

- Add tasks with priority levels
- Mark tasks as completed
- Edit existing tasks
- Delete individual tasks or all tasks at once
- Dark/Light theme toggle
- Data persistence (tasks and theme preference are saved in local storage)
- Automatic sorting of tasks by priority
- Responsive design

## Project Structure

```
src/
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

### Key Components

- **App.tsx**: Main application component that includes theme toggling functionality
- **TaskList.tsx**: Core component for task management operations
- **ThemeToggle**: Component for switching between light and dark themes
- **AddTaskInput**: Component for adding new tasks
- **TaskCard**: Component for displaying and interacting with individual tasks

### Custom Hooks

- **usePersistedState**: A custom hook that persists state in local storage

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher recommended)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/tasklist.git
   cd tasklist
   ```

2. Install dependencies

   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server

   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

- **Adding Tasks**: Enter a task title and select a priority level, then submit
- **Marking Tasks**: Click the checkbox to mark a task as completed
- **Editing Tasks**: Click the edit button on a task to modify its title or priority
- **Deleting Tasks**: Click the delete button on a task to remove it, or use "Delete All" to clear all tasks
- **Theme Toggle**: Click the theme toggle button in the top right to switch between light and dark mode

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite (assumed based on project structure)

## License

[MIT License](LICENSE)
