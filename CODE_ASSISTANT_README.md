# 💻 AI Code Assistant - Feature Documentation

## Overview

The **AI Code Assistant** is an advanced coding companion built with RunAnywhere's Web SDK, showcasing the power of on-device AI with **Tool Calling** capabilities. This feature combines real-time code execution, live HTML preview, and intelligent AI assistance - all running 100% locally in your browser.

## 🎯 Key Features

### 1. **Intelligent Code Assistant with Tool Calling**
- AI can **execute JavaScript code** directly in the browser
- AI can **update the live preview** with generated HTML/CSS/JS
- AI can **read the current code** to provide context-aware suggestions
- All powered by RunAnywhere's Tool Calling API

### 2. **Live Code Editor & Preview**
- Split-pane interface with code editor and live preview
- **Real-time HTML/CSS/JS rendering** in a sandboxed iframe
- Syntax-friendly monospace font for better code readability
- Auto-updating preview as you type

### 3. **Pre-built Templates**
- **Blank** - Start from scratch
- **Hello World** - Simple styled page
- **Interactive Counter** - JavaScript interactivity demo
- **CSS Animation** - Floating animated box

### 4. **Conversational Coding**
Chat with AI to:
- Generate complete web components
- Debug code issues
- Calculate JavaScript expressions
- Explain programming concepts
- Modify existing code

## 🚀 How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Code Assistant Tab                       │
├──────────────────────────┬──────────────────────────────────┤
│   Code Editor Section    │    AI Chat Assistant Section     │
│                          │                                  │
│  ┌─────────────────┐    │  ┌──────────────────────────┐   │
│  │  Code Editor    │    │  │   Chat Messages          │   │
│  │  (HTML/CSS/JS)  │    │  │   - User prompts         │   │
│  └─────────────────┘    │  │   - AI responses         │   │
│                          │  └──────────────────────────┘   │
│  ┌─────────────────┐    │                                  │
│  │  Live Preview   │    │  ┌──────────────────────────┐   │
│  │  (Iframe)       │    │  │   Input Field            │   │
│  └─────────────────┘    │  └──────────────────────────┘   │
└──────────────────────────┴──────────────────────────────────┘
                           ↓
              ┌────────────────────────┐
              │  RunAnywhere SDK       │
              │  - LLM (LFM2 350M)     │
              │  - Tool Calling        │
              │  - On-device inference │
              └────────────────────────┘
```

### Registered Tools

The AI has access to three powerful tools:

#### 1. `execute_code`
Safely executes JavaScript code and returns the result.

**Example:**
```
User: "Calculate fibonacci(10)"
AI: [Calls execute_code with fibonacci function]
AI: "The 10th Fibonacci number is 55"
```

#### 2. `update_preview`
Updates the live preview with new HTML/CSS/JS code.

**Example:**
```
User: "Create a todo list app"
AI: [Calls update_preview with HTML code]
AI: "I've created a todo list app with add/delete functionality"
```

#### 3. `get_current_code`
Retrieves the current code in the editor for context-aware assistance.

**Example:**
```
User: "Add a dark mode toggle to this"
AI: [Calls get_current_code to read existing code]
AI: [Generates enhanced version with dark mode]
AI: [Calls update_preview with modified code]
```

## 📝 Usage Examples

### Example 1: Create a Web Component
```
User: "Create a simple calculator"

AI Response:
- Calls update_preview tool
- Generates HTML with calculator UI
- Includes CSS styling
- Adds JavaScript for button interactions
- Updates the live preview instantly
```

### Example 2: Debug and Fix Code
```
User: "This counter isn't working, can you fix it?"

AI Response:
- Calls get_current_code to analyze
- Identifies the issue
- Calls update_preview with corrected code
- Explains what was wrong
```

### Example 3: JavaScript Calculations
```
User: "What's the factorial of 8?"

AI Response:
- Calls execute_code with factorial function
- Returns: "The factorial of 8 is 40320"
```

### Example 4: Learn by Doing
```
User: "Show me how CSS animations work"

AI Response:
- Creates animated demo
- Calls update_preview
- Explains keyframes, transitions, transforms
```

## 🎨 UI Components

### Code Editor Section (Left)
- **Template Selector**: Quick start with pre-built examples
- **Code Textarea**: Write/edit HTML/CSS/JS with monospace font
- **Live Preview**: Sandboxed iframe showing rendered output

### AI Chat Section (Right)
- **Chat Header**: Shows "AI Code Assistant" with "Tool Calling" badge
- **Chat Messages**: Scrollable conversation history
- **Welcome Screen**: Example prompts to get started
- **Input Field**: Type questions and coding requests

## 🔧 Technical Implementation

### Tool Registration (src/components/CodeTab.tsx)

```typescript
// Register tools when component mounts
useEffect(() => {
  ToolCalling.registerTool(
    {
      name: 'execute_code',
      description: 'Execute JavaScript code and return the result',
      parameters: [
        { name: 'code', type: 'string', description: 'JavaScript code to execute', required: true }
      ],
    },
    async (args) => {
      const jsCode = getStringArg(args, 'code') ?? '';
      try {
        const result = new Function(`"use strict"; return (${jsCode})`)();
        return {
          success: toToolValue(true),
          result: toToolValue(String(result)),
          error: toToolValue(''),
        };
      } catch (error: any) {
        return {
          success: toToolValue(false),
          result: toToolValue(''),
          error: toToolValue(error.message),
        };
      }
    }
  );
  
  // ... register other tools
}, [code]);
```

### AI Generation with Tools

```typescript
const result = await ToolCalling.generateWithTools(userMessage, {
  systemPrompt: `You are an expert coding assistant...`,
  maxTokens: 500,
  temperature: 0.4,
  maxToolCalls: 3,
  autoExecute: true,
});
```

### System Prompt
```
You are an expert coding assistant. You help users write, debug, and improve code.
You have access to tools to execute JavaScript, update the live preview, and get the current code.
When users ask you to create or modify web pages, use the update_preview tool.
When users ask you to calculate or test JavaScript, use the execute_code tool.
Be concise but helpful. Show code examples when relevant.
```

## 🎯 Best Practices

### For Users

1. **Be Specific**: "Create a blue button that says Click Me" is better than "make a button"
2. **Iterate**: Start simple, then ask for enhancements
3. **Use Templates**: Start with a template for faster prototyping
4. **Test Ideas**: Ask AI to calculate or test logic before implementing

### For Developers

1. **Sandbox Security**: The iframe uses `sandbox="allow-scripts"` for safe execution
2. **Tool Return Values**: Always return all expected fields to satisfy TypeScript
3. **Model Loading**: Use `useModelLoader` hook for proper model management
4. **Cleanup**: Unregister tools in `useEffect` cleanup function

## 🌟 Advanced Use Cases

### 1. **Interactive Learning**
- Ask AI to explain concepts with live examples
- Build progressively complex demos
- Learn by modifying generated code

### 2. **Rapid Prototyping**
- Quickly test UI ideas
- Generate boilerplate code
- Experiment with CSS animations and layouts

### 3. **Code Review**
- Paste code and ask for improvements
- Get suggestions for best practices
- Learn optimization techniques

### 4. **Algorithm Visualization**
- Create visual representations of algorithms
- Animate sorting/searching algorithms
- Build interactive data structure demos

## 🔐 Privacy & Performance

- ✅ **100% On-Device**: All AI inference runs locally via WebAssembly
- ✅ **No Server Calls**: Your code never leaves the browser
- ✅ **Offline Capable**: Works without internet after model download
- ✅ **Fast Inference**: LFM2 350M model optimized for speed
- ✅ **Model Caching**: Models stored in OPFS for instant reuse

## 📊 Performance Metrics

- **Model Size**: ~250MB (LFM2 350M Q4_K_M)
- **Inference Speed**: ~20-40 tokens/second (CPU mode)
- **First Load**: ~30-60 seconds (model download)
- **Subsequent Loads**: <2 seconds (from cache)

## 🎓 Example Prompts to Try

### Web Components
- "Create a login form with email and password"
- "Build a image gallery with hover effects"
- "Make a responsive navigation bar"

### Animations
- "Show me a bouncing ball animation"
- "Create a loading spinner"
- "Animate text appearing letter by letter"

### JavaScript
- "Calculate the first 10 prime numbers"
- "Sort this array: [5, 2, 8, 1, 9]"
- "Generate a random color in hex"

### Learning
- "Explain flexbox with an example"
- "Show me how event listeners work"
- "Demonstrate async/await"

## 🔜 Future Enhancements

Potential features to add:
- **Voice Coding Mode**: Dictate code using STT, hear explanations via TTS
- **Code Formatting**: Pretty-print and format code automatically
- **Multiple Files**: Tab-based editor for multi-file projects
- **Export/Import**: Save and load projects
- **Syntax Highlighting**: Full code highlighting with Prism.js
- **Error Detection**: Real-time linting and error highlighting
- **Snippet Library**: Save and reuse code snippets
- **Diff View**: See changes when AI modifies code

## 📚 Related Documentation

- [RunAnywhere Tool Calling Docs](https://docs.runanywhere.ai/web/tool-calling)
- [LLM Generation API](https://docs.runanywhere.ai/web/llm/generate)
- [RunAnywhere Web SDK Intro](https://docs.runanywhere.ai/web/introduction)

## 🤝 Contributing

This feature demonstrates:
- ✨ Tool Calling API usage
- 🎨 Complex UI state management
- 🔧 Safe code execution patterns
- 💬 Conversational AI interface
- 🎯 Real-world practical application

Feel free to extend and customize for your use case!

---

**Built with ❤️ using RunAnywhere Web SDK**
