const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SaaS Personal Agent - Server Running</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #0f172a; color: #e2e8f0; }
          .container { max-width: 800px; margin: 0 auto; }
          .status { background: #059669; color: white; padding: 10px; border-radius: 5px; }
          .info { background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .code { background: #000; color: #00ff00; padding: 10px; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 SaaS Personal Agent</h1>
          <div class="status">✅ Server is running successfully!</div>
          
          <div class="info">
            <h3>Status:</h3>
            <ul>
              <li>✅ Docker container started</li>
              <li>✅ Git repository cloned</li>
              <li>✅ Node.js server running on port 3000</li>
              <li>⏳ Next.js app ready for development</li>
            </ul>
          </div>
          
          <div class="info">
            <h3>Next Steps:</h3>
            <p>The basic server is working. You can now:</p>
            <ol>
              <li>Install dependencies: <code>npm install</code></li>
              <li>Start Next.js: <code>npm run dev</code></li>
              <li>Or use production build process</li>
            </ol>
          </div>
          
          <div class="code">
            Time: ${new Date().toISOString()}<br>
            Node.js: ${process.version}<br>
            Platform: ${process.platform}<br>
          </div>
        </div>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1><p>The server is running but this path was not found.</p>');
  }
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Simple server running at http://0.0.0.0:${PORT}`);
  console.log(`📁 Working directory: ${process.cwd()}`);
  console.log(`🕐 Started at: ${new Date().toISOString()}`);
});