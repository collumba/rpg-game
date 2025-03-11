const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3001;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Normaliza a URL para evitar ataques de path traversal
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html";
  }

  // Obtém a extensão do arquivo
  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || "application/octet-stream";

  // Lê o arquivo e envia a resposta
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Arquivo não encontrado
        fs.readFile("./404.html", (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content, "utf-8");
        });
      } else {
        // Erro de servidor
        res.writeHead(500);
        res.end(`Erro no servidor: ${err.code}`);
      }
    } else {
      // Sucesso
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Pressione Ctrl+C para encerrar o servidor`);
});
