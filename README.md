# Semi-Tractor Builder 🚚

A web-based production management simulation game where you design, create, and build semi-tractors with specialized workers (welders, painters, mechanics).

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/joshuapartridge1775/semi-tractor-builder.git
cd semi-tractor-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will open at `http://localhost:5173`

## Game Overview

### Starting Resources
- **Capital**: $100,000
- **Workers**: 3 (1 welder, 1 painter, 1 mechanic)
- **Goal**: Build and sell semi-tractors for profit

### Core Mechanics

#### 1. **Design Tractors**
- Customize cabin style, engine type, transmission, color, and wheel size
- Set production costs and market prices
- Create multiple designs for different markets

#### 2. **Hire Workers**
- **Welders**: $5,000 (frame assembly)
- **Painters**: $4,500 (finishing)
- **Mechanics**: $5,500 (final assembly)
- Workers develop skills and experience over time
- Manage worker morale for efficiency

#### 3. **Manage Production**
- Assign designs to production pipeline
- Monitor quality and progress
- Optimize worker allocation
- Track production metrics

#### 4. **Earn Profit**
- Sell completed tractors
- Market demand affects prices
- Manage operational costs
- Expand operations with profits

## Game Dashboard

### Left Panel (Main View)
- **Game Time**: Current simulation time
- **Statistics**: Capital, workers, sales, market demand
- **Production Overview**: Active tasks and progress
- **Tractor Gallery**: Your designs

### Right Sidebar
- **Design Panel**: Create and manage designs
- **Production Panel**: Station status and capacity
- **Worker Panel**: Hire and manage workforce

## Controls

- **Click to Hire**: Add workers to increase capacity
- **Select Design**: Click design to make it active
- **Create Design**: Add new tractor design
- **Monitor Progress**: Watch production tasks complete

## Game Speed

Game runs at 1x speed by default. Future versions will support:
- 1x - Normal speed
- 2x - Double speed
- 4x - Fast forward

## Features (Current)

✅ Worker hiring and management
✅ Tractor design customization
✅ Production pipeline simulation
✅ Financial tracking
✅ Multi-worker coordination
✅ Game state management with Redux
✅ Responsive UI design

## Features (Coming Soon)

🔲 Real-time task processing and progress
🔲 Worker assignment and task delegation
🔲 Tractor selling and delivery
🔲 Save/Load game progress
🔲 Market fluctuations and demand curves
🔲 Worker training programs
🔲 Factory upgrades and expansions
🔲 Achievement system
🔲 Sound effects and animations
🔲 Difficulty levels

## Multiplayer (Roadmap)

- 👥 Player accounts and authentication
- 🌍 Shared marketplace
- 📊 Global leaderboards
- ⚔️ Competition modes
- 💬 In-game chat
- 🏭 Cooperative factories

## Technical Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture and design decisions.

## Game Economy

### Revenue Sources
- Selling completed tractors
- Market demand variations
- Quality bonuses

### Expenses
- Worker salaries (monthly)
- Worker hiring costs
- Factory operations
- Upgrades and expansions

### Starting Strategy
1. Start with 3 workers (1 of each type)
2. Create a base design (Classic Hauler)
3. Begin first production run
4. Once profitable, hire additional workers
5. Expand to multiple designs
6. Optimize production pipeline

## Tips & Strategies

### Early Game
- Focus on single design until you have cash flow
- Hire workers gradually as profits increase
- Monitor market demand before expanding
- Balance worker skills with morale

### Mid Game
- Create multiple designs for different markets
- Upgrade worker skills through experience
- Expand production capacity
- Begin building capital reserves

### Late Game
- Automate production pipeline
- Invest in factory upgrades
- Diversify product lineup
- Prepare for multiplayer economy

## Troubleshooting

### Game won't load
- Ensure Node.js 16+ is installed
- Clear browser cache
- Try `npm install` again

### Poor performance
- Close other browser tabs
- Reduce game speed (when implemented)
- Check browser console for errors

### State not updating
- Verify Redux dev tools are not blocking updates
- Check browser console for errors
- Restart dev server

## Contributing

Contributions are welcome! Areas for help:
- UI/UX improvements
- Game balance tuning
- Feature implementation
- Bug fixes
- Documentation

## License

MIT License - Feel free to use this project for learning or as a base for your own game!

## Support

Have questions or found a bug?
- Open an issue on GitHub
- Check existing documentation
- Review the ARCHITECTURE.md file

## Roadmap

v0.2.0 (Next)
- Real-time production processing
- Worker task assignment UI
- Tractor selling system
- Game speed controls

v0.3.0
- Save/Load functionality
- Market economy system
- Worker training
- Factory upgrades

v1.0.0
- Complete core gameplay
- Polish and optimization
- Multiplayer foundation

v2.0.0
- Multiplayer features
- Competitive modes
- Social features

---

**Happy Building! 🏭** Build your semi-tractor empire from the ground up!
