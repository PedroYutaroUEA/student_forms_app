import http from 'node:http';
import fs from 'fs-extra';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = join(__dirname, 'log');
const logFilePath = join(logDir, 'students.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
  console.log('Diretório LOG criado.');
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const data = JSON.parse(body);
      const logData = `name: ${data.name}, age: ${data.age}, gender: ${data.gender}, state: ${data.state}, grade: ${data.grade}\n`;

      fs.appendFile(logFilePath, logData, err => {
        if (err) {
          console.error('Erro ao salvar os dados:', err);
          res.writeHead(500);
          res.end('Erro ao salvar os dados');
        } else {
          console.log('Dados salvos com sucesso.');
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('OK, DADOS SALVOS');
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
