# 🎯 Quick Start Guide - AI Code Assistant

## Getting Started in 30 Seconds

### Step 1: Launch the App
```bash
npm run dev
```
Open http://localhost:5174 (or the port shown in terminal)

### Step 2: Navigate to Code Tab
Click the **💻 Code** button in the navigation bar

### Step 3: Wait for Model Load (First Time Only)
You'll see a banner: "Downloading LLM model... X%"
- This happens once (model is cached for future use)
- Takes about 30-60 seconds depending on connection
- Model size: ~250MB

### Step 4: Start Coding!
You have three options:

#### Option A: Use Templates (Fastest)
Click one of the template buttons:
- **Blank** - Empty canvas
- **Hello World** - Simple starter
- **Interactive Counter** - See JavaScript in action
- **CSS Animation** - Floating animated box

#### Option B: Chat with AI
Type in the chat input on the right:
```
"Create a todo list app"
"Make a calculator"
"Show me a loading spinner animation"
```

#### Option C: Edit Manually + Ask AI for Help
1. Write some code in the editor
2. Ask AI: "Explain this code" or "Make this responsive"
3. AI reads your code and helps improve it

## 🎬 Example Workflow

### Creating a Todo App from Scratch

1. **Ask AI:**
   ```
   Create a simple todo list app
   ```

2. **AI Response:**
   - AI calls `update_preview` tool
   - Generates HTML structure
   - Adds CSS styling
   - Includes JavaScript for add/delete functionality
   - Updates the live preview

3. **You See:**
   - Code appears in the left editor
   - Live app renders in the preview pane
   - AI explains what it created in the chat

4. **Iterate:**
   ```
   Add a checkbox to mark todos as complete
   ```
   
5. **AI Responds:**
   - Reads current code with `get_current_code`
   - Modifies to add checkboxes
   - Updates preview
   - Shows the enhanced version

## 💬 Suggested First Prompts

### For Beginners:
- "Show me a simple button that changes color when clicked"
- "Create a greeting card with my name"
- "Make a digital clock"

### For Learning:
- "Explain how CSS flexbox works with an example"
- "Show me the difference between let, const, and var"
- "Demonstrate event listeners"

### For Fun:
- "Create a bouncing DVD logo"
- "Make a rainbow gradient background"
- "Build a simple game of tic-tac-toe"

### For Testing:
- "Calculate fibonacci(15)"
- "Sort this array: [64, 34, 25, 12, 22, 11, 90]"
- "Check if 17 is a prime number"

## 🎨 UI Layout Explained

```
┌────────────────────────────────────────────────────────────┐
│  RunAnywhere AI                            [CPU/WebGPU]     │
├────────────────────────────────────────────────────────────┤
│  💬 Chat  │  📷 Vision  │  🎙️ Voice  │  💻 Code          │
├────────────────────────────────────────────────────────────┤
│  [Model Banner] (if loading)                               │
├──────────────────────────┬─────────────────────────────────┤
│                          │                                 │
│  CODE EDITOR             │  AI CODE ASSISTANT              │
│  [Templates]             │  [Tool Calling Badge]           │
│                          │                                 │
│  [Your code here...]     │  Chat History:                  │
│                          │  You: Create a calculator       │
│                          │  AI: [Tool calling in progress] │
│                          │  AI: I've created a calculator  │
│  ──────────────────      │      with basic operations...   │
│                          │                                 │
│  LIVE PREVIEW            │  Input:                         │
│  [Rendered output]       │  [Ask me anything...] [➤]      │
│                          │                                 │
└──────────────────────────┴─────────────────────────────────┘
```

## 🔑 Key Features to Try

### 1. Real-time Editing
- Type directly in the code editor
- See changes instantly in the preview
- No need to hit "Run" or "Refresh"

### 2. Tool Calling in Action
Watch AI use tools:
- `execute_code` - When you ask for calculations
- `update_preview` - When generating/modifying web pages
- `get_current_code` - When analyzing your code

You'll see tool calls mentioned in the AI's responses!

### 3. Templates
Quick way to start experimenting:
- Click **Counter** to see JavaScript interactivity
- Click **Animation** to see CSS in action
- Start from any template and modify

### 4. Progressive Enhancement
Start simple, then iterate:
```
You: "Create a button"
AI: [Creates basic button]

You: "Make it bigger and orange"
AI: [Updates with new styles]

You: "Add a click counter"
AI: [Adds JavaScript functionality]
```

## ⚡ Pro Tips

### 1. Be Specific
❌ "Make a website"
✅ "Create a landing page with a hero section and two columns"

### 2. Use Templates as Starting Points
Instead of asking for complex apps from scratch:
1. Start with "Counter" template
2. Ask: "Turn this into a quiz app"

### 3. Experiment with Calculations
```
"Calculate factorial of 20"
"Generate 10 random numbers between 1 and 100"
"Find the largest number in [45, 78, 12, 90, 34]"
```

### 4. Learn by Example
```
"Show me how to center a div"
"Demonstrate promise.then() vs async/await"
"Create an example of the fetch API"
```

## 🐛 Troubleshooting

### Model Won't Load?
- Check browser console for errors
- Ensure you have 2GB+ free RAM
- Try refreshing the page
- Clear browser cache if needed

### Preview Not Updating?
- AI needs to call `update_preview` tool
- Try: "Update the preview with [your code]"
- Or edit manually in the editor

### AI Not Understanding?
- Be more specific in your request
- Show example: "Like the counter but for tracking expenses"
- Break complex tasks into steps

### Code Errors?
- Check browser console in preview iframe
- Ask AI: "Debug this code"
- Start with a template that works

## 🎓 Learning Path

### Week 1: Basics
1. Try all templates
2. Modify colors and text
3. Ask AI to explain each part

### Week 2: Interactivity
1. Add click handlers
2. Create forms
3. Store data in variables

### Week 3: Styling
1. Experiment with CSS animations
2. Make responsive layouts
3. Try different color schemes

### Week 4: Advanced
1. Build a complete mini-project
2. Combine multiple concepts
3. Ask AI for best practices

## 🌟 Cool Things to Build

### Beginner:
- Personal business card
- Quote of the day
- Color palette generator
- Simple calculator

### Intermediate:
- Todo list with localStorage
- Weather display (with mock data)
- Image gallery with lightbox
- Countdown timer

### Advanced:
- Mini drawing app
- Memory card game
- Markdown previewer
- Expense tracker

## 📱 Mobile Usage

On smaller screens:
- Layout stacks vertically
- Editor on top, chat on bottom
- Swipe to scroll between sections
- Use landscape for more space

## 🎉 Have Fun!

The AI Code Assistant is:
- **Your coding buddy** - Always ready to help
- **Your playground** - Experiment freely
- **Your teacher** - Learn by doing
- **Your tool** - Build real things

**Start with a simple prompt and see where it takes you!**

```
Try this right now:
"Create a button that says Hello World and alerts when clicked"
```

Happy coding! 🚀
