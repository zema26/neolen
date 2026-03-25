//This is the core TypeScript logic used to power the compiler. It reads the Neolen string line by line and outputs standard JavaScript.


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