import express from "express";
import next from "next";
import { parse } from 'url';

const port = parseInt(process.env.PORT as string, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  });

  server.listen(port, () => {
    
    console.log(`Next.js server listening on port: ${port}`);
  });
});
