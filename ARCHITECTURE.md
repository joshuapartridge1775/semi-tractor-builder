# Semi-Tractor Builder - Architecture Guide

## Project Overview

Semi-Tractor Builder is a web-based production management simulation game built with React, Redux, and TypeScript. Players manage a semi-tractor manufacturing facility, hiring workers, designing products, and managing production pipelines.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/           # React UI Components
│   ├── Dashboard.tsx     # Main game interface
│   ├── StatCard.tsx      # Stat display cards
│   ├── ProductionPanel.tsx
│   ├── WorkerPanel.tsx
│   ├── DesignPanel.tsx
│   ├── ProductionOverview.tsx
│   └── TractorGallery.tsx
│
├── store/                # Redux State Management
│   ├── store.ts          # Redux store configuration
│   ├── gameSlice.ts      # Game state (time, speed, paused)
│   ├── workersSlice.ts   # Worker management state
│   ├── productionSlice.ts # Production tasks state
│   ├── designSlice.ts    # Tractor design state
│   └── economySlice.ts   # Financial state
│
├── utils/
│   └── formatters.ts     # Utility functions for formatting
│
├── App.tsx               # Main app component
├── main.tsx              # React entry point
└── index.css             # Global styles
```

## State Management (Redux)

### Game State (`gameSlice.ts`)
- Tracks game time, speed, pause state, and difficulty
- Updates game time each frame
- Allows speed control (1x, 2x, 4x)

### Workers State (`workersSlice.ts`)
- Manages all worker data (welders, painters, mechanics)
- Tracks skills, experience, efficiency, and morale
- Supports hiring, firing, and skill progression

### Production State (`productionSlice.ts`)
- Manages production tasks and their progress
- Tracks welding, painting, and mechanics stages
- Monitors quality and completion status

### Design State (`designSlice.ts`)
- Stores tractor design specifications
- Manages cabin style, engine type, colors, etc.
- Tracks base and market prices

### Economy State (`economySlice.ts`)
- Manages capital, revenue, and expenses
- Tracks tractor sales and market demand
- Starting capital: $100,000

## Game Mechanics

### Worker System
- **Three Worker Types**: Welders, Painters, Mechanics
- **Skill Progression**: Workers improve over time
- **Morale System**: Affects efficiency and retention
- **Hiring Costs**:
  - Welder: $5,000
  - Painter: $4,500
  - Mechanic: $5,500
- **Monthly Payroll**: Calculated from all workers' salaries

### Production Pipeline
1. **Welding** (~120 seconds)
   - Combines frame components
   - Requires welder
2. **Painting** (~90 seconds)
   - Applies finish coat
   - Requires painter
3. **Mechanics** (~90 seconds)
   - Final assembly and testing
   - Requires mechanic

### Design System
- **Customization Options**:
  - Cabin style: Day cab, Sleeper, Extended
  - Engine: Diesel, Natural Gas, Hybrid
  - Transmission: Manual, Automatic
  - Colors: Full hex color palette
  - Wheel sizes: 18, 20, 22 inches
- **Pricing**: Dynamic base and market prices

## Component Hierarchy

```
App
├── Dashboard (main game view)
│   ├── StatCard (x4) - Capital, Workers, Sales, Demand
│   ├── ProductionOverview - Active tasks display
│   └── TractorGallery - Design showcase
├── DesignPanel (right sidebar)
├── ProductionPanel (right sidebar)
└── WorkerPanel (right sidebar)
```

## Data Flow

1. **User Interaction** → Component dispatches Redux action
2. **Redux Store** → Updates state in relevant slice
3. **Component Subscription** → Components re-render with new data
4. **Selectors** → Extract specific state for components

## Key Features for Expansion

### Planned Features
- [ ] Game loop with real-time production progress
- [ ] Worker assignment UI
- [ ] Selling completed tractors
- [ ] Save/Load game state (localStorage)
- [ ] Market fluctuations and demand curves
- [ ] Worker training and upgrades
- [ ] Factory upgrades and expansion
- [ ] Achievement system
- [ ] Sound effects and animations

### Multiplayer Architecture (Future)
- Event-based state updates (compatible with WebSocket)
- Server-side validation of calculations
- Player account system
- Shared marketplace
- Leaderboards
- PvP competition modes

## Redux Action Examples

```typescript
// Hiring a worker
dispatch(hireWorker('welder'))

// Creating a production task
dispatch(createTask({ designId, stage, workerId }))

// Updating task progress
dispatch(updateTaskProgress({ taskId, progress: 50 }))

// Selling a tractor
dispatch(sellTractor(65000))

// Creating a new design
dispatch(createDesign({...design}))
```

## Performance Considerations

- Redux selectors prevent unnecessary re-renders
- Memoization opportunities for complex calculations
- Indexed lookups for worker and task data
- Game loop runs at configurable FPS

## Styling Approach

- Custom industrial color palette via Tailwind config
- Responsive grid layout (12-column)
- CSS custom properties for animations
- Accessible color contrasts

## Configuration

### Game Constants
- Starting capital: $100,000
- Worker costs vary by specialization
- Production stage durations: 90-120 seconds
- Difficulty modifiers: Coming soon

## Development Workflow

1. Start dev server: `npm run dev`
2. Make changes to components or slices
3. Hot module replacement (HMR) updates instantly
4. Build for production: `npm run build`

## Testing Strategy (Recommended)

- Unit tests for Redux slices
- Component integration tests
- Game logic tests for calculations
- E2E tests for critical game flow

## Future Optimization Points

1. **Code Splitting** - Lazy load design complexity
2. **State Normalization** - Flatten nested data structures
3. **Worker Pooling** - Efficient worker allocation
4. **Caching** - Memoize expensive calculations
5. **WebSocket** - Real-time multiplayer sync
