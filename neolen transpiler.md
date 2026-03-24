Here is a small, dark-themed compiler (implemented as a transpiler to JavaScript) for the Neolen language. 

To make this immediately usable in a web environment, I have designed a dark-themed UI with HTML and CSS, and wrote the compiler logic in **TypeScript**. Since browsers cannot run raw TypeScript directly, the provided code snippet includes the equivalent compiled JavaScript in the `<script>` tag so you can paste it straight into an `.html` file and run it, while the TypeScript source is provided for your actual codebase.

### How this Transpiler Works
Building a full, production-ready compiler from scratch is a massive undertaking. For this lightweight web version, we use a **transpiler** approach. It reads the Neolen code and translates its unique syntax into executable JavaScript by parsing the rules you provided:
* Translating the assignment operator `variable : value` to JavaScript's `=`.
* Converting markup-style tagged keywords like `<fun>`, `<while>`, and `<if>` into standard JavaScript functions and blocks.
* Mapping Neolen's specific `<for> int i(0)++ < n` syntax into a standard JS `for` loop.
* Catching Neolen's I/O patterns like `-> out` and converting them to `console.log()`.

---

### The TypeScript Compiler Logic (`compiler.ts`)
This is the core TypeScript logic used to power the compiler. It reads the Neolen string line by line and outputs standard JavaScript.

```typescript
class NeolenCompiler {
    public compile(source: string): string {
        let jsOutput = "";
        const lines = source.split('\n');

        for (let line of lines) {
            let code = line.trim();
            if (!code || code.startsWith("//")) {
                jsOutput += code + "\n";
                continue;
            }

            // 1. Modules
            if (code.startsWith("<module>")) { jsOutput += `// ${code}\n`; continue; }
            if (code === "</module>") { jsOutput += `// End Module\n`; continue; }

            // 2. Functions
            const funMatch = code.match(/<fun>\s+(int|float|string|bool|char)\s+(\w+)\((.*?)\)/);
            if (funMatch) {
                // Strip Neolen types from arguments for JS
                const args = funMatch[3].replace(/(int|float|string|bool|char)\s+/g, '');
                jsOutput += `function ${funMatch[2]}(${args}) {\n`;
                continue;
            }
            if (code === "</fun>") { jsOutput += `}\n`; continue; }
            
            // Return Statement
            const retMatch = code.match(/<return>\s*(.*?)\s*<\/return>/);
            if (retMatch) { jsOutput += `    return ${retMatch[1]};\n`; continue; }

            // 3. Control Flow
            if (code.startsWith("<while>")) { jsOutput += `while (${code.substring(7).trim()}) {\n`; continue; }
            if (code === "</while>") { jsOutput += `}\n`; continue; }
            
            if (code.startsWith("<if>")) { jsOutput += `if (${code.substring(4).trim()}) {\n`; continue; }
            if (code === "</if>") { jsOutput += `}\n`; continue; }
            if (code === "<else>") { jsOutput += `} else {\n`; continue; }
            if (code === "</else>") { continue; } // Redundant in JS since </if> closes

            // For Loops
            const forMatch = code.match(/<for>\s+(int|float)\s+(\w+)\((.*?)\)\+\+\s*<\s*(.*)/);
            if (forMatch) {
                jsOutput += `for (let ${forMatch[2]} = ${forMatch[3]}; ${forMatch[2]} < ${forMatch[4]}; ${forMatch[2]}++) {\n`;
                continue;
            }
            if (code === "</for>") { jsOutput += `}\n`; continue; }

            // 4. Variables & Assignment
            // Variable initialization: int i(0)
            const varInitMatch = code.match(/(int|float|bool|string|char)\s+(\w+)\((.*?)\)/);
            if (varInitMatch) { jsOutput += `let ${varInitMatch[2]} = ${varInitMatch[3]};\n`; continue; }

            // Standard assignment: a : a - b
            if (code.includes(" : ")) {
                let parts = code.split(" : ");
                jsOutput += `${parts[0].trim()} = ${parts[1].trim()};\n`;
                continue;
            }

            // 5. I/O
            if (code.includes("->") && code.includes("out")) {
                let outVal = code.split("->")[0].trim();
                jsOutput += `console.log(${outVal});\n`;
                continue;
            }

            // Default pass-through for anything missed (like standard math or function calls)
            jsOutput += `${code}\n`;
        }

        return jsOutput;
    }
}
```

---

### The Dark-Themed Web App (`index.html`)

Save the following code as `index.html` and open it in any web browser. It features a dark-themed layout, a text area to paste your Neolen code (like the Euclidean example), and a compilation button that transpiles it to JavaScript and executes it, capturing the output.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neolen Dark Compiler</title>
    <style>
        :root {
            --bg-dark: #1e1e1e;
            --bg-panel: #2d2d2d;
            --text-light: #d4d4d4;
            --accent: #569cd6;
            --border: #444;
        }
        body {
            background-color: var(--bg-dark);
            color: var(--text-light);
            font-family: 'Consolas', 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            height: 100vh;
            box-sizing: border-box;
        }
        h1 {
            color: var(--accent);
            margin-top: 0;
            font-size: 1.5rem;
        }
        .container {
            display: flex;
            gap: 20px;
            flex: 1;
        }
        .panel {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        textarea, .output {
            flex: 1;
            background-color: var(--bg-panel);
            color: var(--text-light);
            border: 1px solid var(--border);
            border-radius: 5px;
            padding: 15px;
            font-size: 14px;
            font-family: inherit;
            resize: none;
            overflow-y: auto;
            white-space: pre-wrap;
        }
        textarea:focus {
            outline: none;
            border-color: var(--accent);
        }
        .controls {
            margin: 15px 0;
            display: flex;
            gap: 10px;
        }
        button {
            background-color: var(--accent);
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 3px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover {
            background-color: #4ea8ea;
        }
    </style>
</head>
<body>

    <h1>Neolen Web Compiler</h1>
    
    <div class="container">
        <div class="panel">
            <label>Neolen Source Code:</label>
            <textarea id="sourceCode" spellcheck="false">
<module> Euclidean 

  <fun> int Euclid(int a, int b)  
    <while> b != 0
      <if> a > b
        a : a - b
      <else>
        b : b - a
      </else>
      </if>
    </while>
    <return> a </return>
  </fun>

</module></textarea>
        </div>

        <div class="panel">
            <label>Console Output:</label>
            <div id="outputConsole" class="output"></div>
        </div>
    </div>

    <div class="controls">
        <button onclick="runCompiler()">Compile & Run</button>
    </div>

    <script>
        // Compiled version of the TypeScript NeolenCompiler
        class NeolenCompiler {
            compile(source) {
                let jsOutput = "";
                const lines = source.split('\n');
                for (let line of lines) {
                    let code = line.trim();
                    if (!code || code.startsWith("//")) { jsOutput += code + "\n"; continue; }
                    
                    if (code.startsWith("<module>")) { jsOutput += `// ${code}\n`; continue; }
                    if (code === "</module>") { jsOutput += `// End Module\n`; continue; }
                    
                    const funMatch = code.match(/<fun>\s+(int|float|string|bool|char)\s+(\w+)\((.*?)\)/);
                    if (funMatch) {
                        const args = funMatch[3].replace(/(int|float|string|bool|char)\s+/g, '');
                        jsOutput += `function ${funMatch[2]}(${args}) {\n`; continue;
                    }
                    if (code === "</fun>") { jsOutput += `}\n`; continue; }
                    
                    const retMatch = code.match(/<return>\s*(.*?)\s*<\/return>/);
                    if (retMatch) { jsOutput += `    return ${retMatch[1]};\n`; continue; }
                    
                    if (code.startsWith("<while>")) { jsOutput += `while (${code.substring(7).trim()}) {\n`; continue; }
                    if (code === "</while>") { jsOutput += `}\n`; continue; }
                    if (code.startsWith("<if>")) { jsOutput += `if (${code.substring(4).trim()}) {\n`; continue; }
                    if (code === "</if>") { jsOutput += `}\n`; continue; }
                    if (code === "<else>") { jsOutput += `} else {\n`; continue; }
                    if (code === "</else>") continue;
                    
                    const forMatch = code.match(/<for>\s+(int|float)\s+(\w+)\((.*?)\)\+\+\s*<\s*(.*)/);
                    if (forMatch) {
                        jsOutput += `for (let ${forMatch[2]} = ${forMatch[3]}; ${forMatch[2]} < ${forMatch[4]}; ${forMatch[2]}++) {\n`; continue;
                    }
                    if (code === "</for>") { jsOutput += `}\n`; continue; }
                    
                    const varInitMatch = code.match(/(int|float|bool|string|char)\s+(\w+)\((.*?)\)/);
                    if (varInitMatch) { jsOutput += `let ${varInitMatch[2]} = ${varInitMatch[3]};\n`; continue; }
                    
                    if (code.includes(" : ")) {
                        let parts = code.split(" : ");
                        jsOutput += `${parts[0].trim()} = ${parts[1].trim()};\n`; continue;
                    }
                    
                    if (code.includes("->") && code.includes("out")) {
                        let outVal = code.split("->")[0].trim();
                        jsOutput += `logOutput(${outVal});\n`; continue;
                    }
                    jsOutput += `${code}\n`;
                }
                return jsOutput;
            }
        }

        // Environment Setup
        const compiler = new NeolenCompiler();
        const outConsole = document.getElementById("outputConsole");

        function logOutput(msg) {
            outConsole.innerHTML += msg + "<br>";
        }

        function runCompiler() {
            outConsole.innerHTML = ""; // Clear console
            const code = document.getElementById("sourceCode").value;
            
            try {
                const jsCode = compiler.compile(code);
                // Execute the transpiled JavaScript securely
                const execute = new Function('logOutput', jsCode + '\n// Automatically calling logOutput for demonstration\nif(typeof Euclid !== "undefined") logOutput("Euclid(105, 33) returns: " + Euclid(105, 33));');
                execute(logOutput);
            } catch (err) {
                outConsole.innerHTML = `<span style="color: #ff5555;">Error: ${err.message}</span>`;
            }
        }
    </script>
</body>
</html>
```

Would you like me to add support for Neolen's specific array initialization syntaxes (like `int a[4]([1, 2, 3, 4])`) to the TypeScript logic as well?