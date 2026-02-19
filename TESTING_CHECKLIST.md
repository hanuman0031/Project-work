# 🧪 Testing Checklist - AI Code Assistant

## Pre-Flight Checks ✅
- [x] Build successful: `npm run build` ✅
- [x] TypeScript compilation: No errors ✅
- [x] CodeTab.tsx: 326 lines ✅
- [x] App.tsx: Code tab integrated ✅
- [x] CSS: 694 lines (250+ for code tab) ✅

## Component Tests

### 1. Basic Rendering ✅
- [ ] Navigate to Code tab (💻 icon)
- [ ] Verify split-pane layout appears
- [ ] Check left side: Code Editor + Live Preview
- [ ] Check right side: AI Chat Assistant
- [ ] Verify "Tool Calling" badge visible

### 2. Model Loading
- [ ] Model loading banner appears
- [ ] Download progress shows (first time)
- [ ] Progress bar updates
- [ ] Banner disappears when ready
- [ ] UI becomes interactive

### 3. Template System
- [ ] Click "Blank" - Editor clears
- [ ] Click "Hello World" - Code loads + Preview updates
- [ ] Click "Interactive Counter" - Counter works in preview
- [ ] Click "CSS Animation" - Box animates in preview
- [ ] All templates render correctly

### 4. Code Editor
- [ ] Type in textarea
- [ ] Code appears in monospace font
- [ ] Live preview updates automatically
- [ ] Manual HTML/CSS/JS works
- [ ] No lag or performance issues

### 5. Live Preview
- [ ] Iframe renders HTML
- [ ] CSS styles apply
- [ ] JavaScript executes
- [ ] Interactive elements work (buttons, clicks)
- [ ] Sandboxed (no access to parent)

### 6. AI Chat Interface
- [ ] Welcome message displays
- [ ] Example prompts visible
- [ ] Input field accepts text
- [ ] Enter key sends message
- [ ] Send button (➤) works
- [ ] Button disabled when empty
- [ ] Auto-scroll to bottom

### 7. Tool Calling - execute_code
**Test 1: Simple calculation**
- Input: "Calculate 5 + 3"
- Expected: AI uses execute_code, returns "8"

**Test 2: Fibonacci**
- Input: "Calculate fibonacci(10)"
- Expected: AI creates function, returns "55"

**Test 3: Array operations**
- Input: "Sort this array: [64, 34, 25, 12, 22]"
- Expected: AI sorts and returns result

**Test 4: Error handling**
- Input: "Calculate undefined_variable"
- Expected: AI returns error gracefully

### 8. Tool Calling - update_preview
**Test 1: Simple button**
- Input: "Create a button that says Click Me"
- Expected: Button appears in preview

**Test 2: Todo list**
- Input: "Create a todo list app"
- Expected: Full HTML/CSS/JS app generated

**Test 3: Calculator**
- Input: "Make a calculator"
- Expected: Calculator UI with working buttons

**Test 4: Styling**
- Input: "Create a button with rainbow gradient"
- Expected: Styled button with gradient

### 9. Tool Calling - get_current_code
**Test 1: Code analysis**
- Load Counter template
- Input: "Explain this code"
- Expected: AI reads code and explains

**Test 2: Enhancement**
- Load Hello World template
- Input: "Add a button that shows alert"
- Expected: AI reads, modifies, updates preview

**Test 3: Debugging**
- Write buggy code manually
- Input: "Fix this code"
- Expected: AI identifies and fixes issues

### 10. Multi-Tool Orchestration
**Test 1: Calculation then preview**
- Input: "Calculate 10! and show it in a styled div"
- Expected: AI calculates, then creates HTML display

**Test 2: Progressive enhancement**
- Input: "Create a button, then make it bigger"
- Expected: AI creates button, then enhances it

**Test 3: Complex request**
- Input: "Create a countdown timer from 10 to 0"
- Expected: AI generates full timer with JavaScript

### 11. Error Handling
- [ ] Invalid JavaScript in execute_code
- [ ] Network timeout during generation
- [ ] Model loading failure
- [ ] Empty preview updates
- [ ] Malformed HTML

### 12. UI/UX
- [ ] Messages scroll automatically
- [ ] Loading indicator shows during generation
- [ ] Send button shows ⏳ when generating
- [ ] Input disabled during generation
- [ ] Clean error messages
- [ ] Typing indicator appears

### 13. Responsive Design
- [ ] Desktop: Split-pane side-by-side
- [ ] Tablet: Layout adjusts
- [ ] Mobile: Stacked vertically
- [ ] Touch interactions work
- [ ] Buttons are tap-friendly

### 14. Performance
- [ ] No lag when typing
- [ ] Preview updates smoothly
- [ ] Chat scrolls smoothly
- [ ] Token generation speed acceptable
- [ ] Memory usage reasonable

### 15. Edge Cases
- [ ] Very long code in editor
- [ ] Many chat messages (20+)
- [ ] Rapid template switching
- [ ] Multiple tool calls in sequence
- [ ] Complex nested HTML

## Integration Tests

### 16. Tab Switching
- [ ] Switch to Code tab
- [ ] Switch to Chat tab and back
- [ ] Model stays loaded
- [ ] State persists
- [ ] No memory leaks

### 17. Model Management
- [ ] Same model used for Chat and Code
- [ ] Coexistence with other models
- [ ] Model unload/reload
- [ ] Cache works (reload page)

### 18. System Prompt
- [ ] AI behaves as coding assistant
- [ ] AI uses tools appropriately
- [ ] AI provides code examples
- [ ] AI is concise but helpful

## Real-World Scenarios

### Scenario 1: Learning Web Development
1. Start with Blank template
2. Ask: "Show me how to center a div"
3. Verify: AI provides working example
4. Ask: "Make it have a shadow"
5. Verify: AI enhances existing code

### Scenario 2: Rapid Prototyping
1. Ask: "Create a login form"
2. Verify: Form appears with email/password
3. Ask: "Add validation"
4. Verify: AI adds JavaScript validation
5. Ask: "Style it modern"
6. Verify: AI updates CSS

### Scenario 3: Debugging
1. Load Counter template
2. Manually break the code
3. Ask: "Why isn't this working?"
4. Verify: AI identifies issue
5. Ask: "Fix it"
6. Verify: Working code restored

### Scenario 4: Algorithm Learning
1. Ask: "Show me bubble sort with visualization"
2. Verify: AI creates animated visualization
3. Ask: "Explain how it works"
4. Verify: AI provides explanation
5. Test: Run the visualization

### Scenario 5: Creative Coding
1. Ask: "Create a rainbow gradient background"
2. Verify: Gradient appears
3. Ask: "Animate it"
4. Verify: Animation works
5. Ask: "Add floating shapes"
6. Verify: Shapes appear and float

## Acceptance Criteria

### Must Have ✅
- [x] Code tab appears in navigation
- [ ] Model loads successfully
- [ ] All three tools registered
- [ ] execute_code works
- [ ] update_preview works
- [ ] get_current_code works
- [ ] Templates load
- [ ] Live preview renders
- [ ] Chat interface functional
- [ ] AI generates responses

### Should Have
- [ ] Smooth animations
- [ ] Auto-scroll
- [ ] Loading indicators
- [ ] Error messages
- [ ] Responsive layout
- [ ] Example prompts

### Nice to Have
- [ ] Syntax highlighting (future)
- [ ] Code formatting (future)
- [ ] Multi-file support (future)
- [ ] Export/Import (future)

## Performance Benchmarks

### Expected Performance:
- Model load: 30-60 seconds (first time)
- Model load: <2 seconds (cached)
- Token generation: 20-40 tok/sec (CPU)
- Tool execution: <50ms
- Response time: 2-5 seconds typical
- Memory: <1GB after model load

## Security Checks

- [ ] iframe sandboxed properly
- [ ] No access to parent window
- [ ] Safe JavaScript execution
- [ ] No XSS vulnerabilities
- [ ] No code injection possible

## Browser Compatibility

### Test Browsers:
- [ ] Chrome 120+ (recommended)
- [ ] Edge 120+
- [ ] Firefox (if compatible)
- [ ] Safari (if compatible)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## Final Verification

- [ ] All features working
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Documentation accurate
- [ ] Examples work
- [ ] Ready for production

## Test Results Summary

**Date**: ________________
**Tester**: ________________
**Browser**: ________________
**Device**: ________________

**Tests Passed**: ___ / ___
**Tests Failed**: ___ / ___
**Critical Issues**: _______________
**Minor Issues**: _______________

**Overall Status**: ⭐ ⭐ ⭐ ⭐ ⭐
**Ready for Production**: YES / NO

## Notes

_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________
