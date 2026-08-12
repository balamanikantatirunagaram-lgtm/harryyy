/* eslint-disable @typescript-eslint/no-explicit-any */

let pyodideInstance: any = null;

export const initPyodide = async () => {
  if (pyodideInstance) return pyodideInstance;
  
  try {
    // @ts-ignore
    if (window.loadPyodide) {
      // @ts-ignore
      pyodideInstance = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
      });
      return pyodideInstance;
    }
  } catch (error) {
    console.error("Failed to load Pyodide:", error);
    throw error;
  }
};

export const runPythonCode = async (code: string): Promise<{ output: string, error: string | null }> => {
  const pyodide = await initPyodide();
  if (!pyodide) {
    return { output: '', error: 'Pyodide not initialized.' };
  }

  // Redirect stdout to capture print() statements
  pyodide.runPython(`
    import sys
    import io
    sys.stdout = io.StringIO()
  `);

  try {
    await pyodide.runPythonAsync(code);
    const stdout = pyodide.runPython("sys.stdout.getvalue()");
    return { output: stdout, error: null };
  } catch (error: any) {
    // If there's an error, still try to grab any stdout before the crash
    let stdout = '';
    try {
      stdout = pyodide.runPython("sys.stdout.getvalue()");
    } catch {
      // Ignore inner error, just use whatever stdout we captured
    }
    
    return { output: stdout, error: error.message };
  }
};
