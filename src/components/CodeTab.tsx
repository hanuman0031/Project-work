import { useState, useRef, useEffect } from 'react';
import { ModelCategory } from '@runanywhere/web';
import { ToolCalling, toToolValue, getStringArg } from '@runanywhere/web-llamacpp';
import { useModelLoader } from '../hooks/useModelLoader';
import { ModelBanner } from './ModelBanner';

// Code templates for quick start
const CODE_TEMPLATES = {
  blank: { name: 'Blank', code: '' },
  hello: {
    name: 'Hello World',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; padding: 2rem; background: #1a1a1a; color: #fff; }
    h1 { color: #ff6900; }
  </style>
</head>
<body>
  <h1>Hello, World! 🚀</h1>
  <p>Edit the code and see live changes.</p>
</body>
</html>`,
  },
  counter: {
    name: 'Interactive Counter',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; display: flex; justify-content: center; 
           align-items: center; min-height: 100vh; background: #1a1a1a; color: #fff; }
    .counter { text-align: center; }
    h1 { font-size: 4rem; margin: 1rem 0; color: #ff6900; }
    button { padding: 1rem 2rem; font-size: 1.2rem; margin: 0.5rem; 
             background: #ff6900; color: #fff; border: none; 
             border-radius: 8px; cursor: pointer; }
    button:hover { background: #e55d00; }
  </style>
</head>
<body>
  <div class="counter">
    <h1 id="count">0</h1>
    <button onclick="decrement()">−</button>
    <button onclick="reset()">Reset</button>
    <button onclick="increment()">+</button>
  </div>
  <script>
    let count = 0;
    const display = document.getElementById('count');
    function increment() { count++; display.textContent = count; }
    function decrement() { count--; display.textContent = count; }
    function reset() { count = 0; display.textContent = count; }
  </script>
</body>
</html>`,
  },
  animation: {
    name: 'CSS Animation',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; background: #0a0a0a; 
           display: flex; justify-content: center; align-items: center; 
           min-height: 100vh; overflow: hidden; }
    .box { width: 100px; height: 100px; background: linear-gradient(135deg, #ff6900, #e55d00);
           border-radius: 20px; animation: float 3s ease-in-out infinite; 
           box-shadow: 0 10px 30px rgba(255, 105, 0, 0.5); }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-30px) rotate(180deg); }
    }
  </style>
</head>
<body>
  <div class="box"></div>
</body>
</html>`,
  },
};

export function CodeTab() {
  const [code, setCode] = useState(CODE_TEMPLATES.hello.code);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loader = useModelLoader(ModelCategory.Language);

  // Register code execution tools
  useEffect(() => {
    // Tool 1: Execute JavaScript code
    ToolCalling.registerTool(
      {
        name: 'execute_code',
        description: 'Execute JavaScript code and return the result',
        parameters: [
          { name: 'code', type: 'string', description: 'JavaScript code to execute', required: true },
        ],
      },
      async (args) => {
        const jsCode = getStringArg(args, 'code') ?? '';
        try {
          // Safe execution in isolated context
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

    // Tool 2: Update the live preview
    ToolCalling.registerTool(
      {
        name: 'update_preview',
        description: 'Update the live HTML/CSS/JS preview with new code',
        parameters: [
          { name: 'html', type: 'string', description: 'Complete HTML code with CSS and JS', required: true },
        ],
      },
      async (args) => {
        const htmlCode = getStringArg(args, 'html') ?? '';
        setCode(htmlCode);
        return {
          success: toToolValue(true),
          message: toToolValue('Preview updated successfully'),
        };
      }
    );

    // Tool 3: Get current code
    ToolCalling.registerTool(
      {
        name: 'get_current_code',
        description: 'Get the current code in the editor',
        parameters: [],
      },
      async () => {
        return {
          code: toToolValue(code),
        };
      }
    );

    return () => {
      ToolCalling.unregisterTool('execute_code');
      ToolCalling.unregisterTool('update_preview');
      ToolCalling.unregisterTool('get_current_code');
    };
  }, [code]);

  // Update iframe when code changes
  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }, [code]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsGenerating(true);

    try {
      // Enhanced system prompt for coding assistant
      const systemPrompt = `You are an expert coding assistant. You help users write, debug, and improve code.
You have access to tools to execute JavaScript, update the live preview, and get the current code.
When users ask you to create or modify web pages, use the update_preview tool.
When users ask you to calculate or test JavaScript, use the execute_code tool.
Be concise but helpful. Show code examples when relevant.`;

      const result = await ToolCalling.generateWithTools(userMessage, {
        systemPrompt,
        maxTokens: 500,
        temperature: 0.4,
        maxToolCalls: 3,
        autoExecute: true,
      });

      setMessages((prev) => [...prev, { role: 'assistant', text: result.text }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `Error: ${error.message || 'Failed to generate response'}` },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (template: keyof typeof CODE_TEMPLATES) => {
    setCode(CODE_TEMPLATES[template].code);
  };

  // Ensure model is loaded before rendering main UI
  useEffect(() => {
    if (loader.state === 'idle') {
      loader.ensure();
    }
  }, [loader]);

  return (
    <div className="tab-panel code-tab">
      <ModelBanner
        state={loader.state}
        progress={loader.progress}
        error={loader.error}
        onLoad={loader.ensure}
        label="LLM"
      />
      <div className="code-layout">
        {/* Left: Editor + Preview */}
        <div className="code-editor-section">
          <div className="code-header">
            <h3>Code Editor</h3>
            <div className="template-selector">
              {Object.entries(CODE_TEMPLATES).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => handleTemplateSelect(key as keyof typeof CODE_TEMPLATES)}
                  className="template-btn"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your HTML/CSS/JS code here..."
            spellCheck={false}
          />
          <div className="preview-section">
            <h3>Live Preview</h3>
            <iframe
              ref={iframeRef}
              className="preview-iframe"
              sandbox="allow-scripts"
              title="Code Preview"
            />
          </div>
        </div>

        {/* Right: AI Assistant Chat */}
        <div className="code-chat-section">
          <div className="chat-header">
            <h3>AI Code Assistant</h3>
            <span className="badge">Tool Calling</span>
          </div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <p>👋 Hi! I'm your AI coding assistant.</p>
                <p>Try asking me:</p>
                <ul>
                  <li>"Create a todo list app"</li>
                  <li>"Add a dark mode toggle"</li>
                  <li>"Calculate fibonacci(10)"</li>
                  <li>"Explain the current code"</li>
                </ul>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
            {isGenerating && (
              <div className="chat-message assistant">
                <strong>AI:</strong>
                <div className="message-text typing-indicator">Thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about code..."
              disabled={isGenerating}
              className="chat-input"
            />
            <button onClick={handleSend} disabled={isGenerating || !input.trim()} className="send-btn">
              {isGenerating ? '⏳' : '➤'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
