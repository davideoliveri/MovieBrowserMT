import fs from 'fs/promises';
import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const isProduction = process.env.NODE_ENV === 'production';
const Port = process.env.PORT || 3000;
const Base = process.env.BASE || '/';

const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', { encoding: 'utf-8' })
  : '';

const ssrManifest = isProduction
  ? await fs.readFile(
      './dist/client/.vite/ssr-manifest.json',
      {
        encoding: 'utf-8',
      },
      () => {}
    )
  : undefined;

const app = express();
let vite;

// ? Add vite or respective production middlewares
if (!isProduction) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);
} else {
  const sirv = (await import('sirv')).default;
  const compression = (await import('compression')).default;
  console.log('templateHtml', templateHtml);
  app.use(compression());
  app.use(
    Base,
    sirv('./dist/client', {
      extensions: [],
      gzip: true,
    })
  );
}

// ? Add Your Custom Routers & Middlewares heare
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

// ? SSR Render - Rendring Middleware
app.use('/{*splat}/', async (req, res, next) => {
  // ! Favicon Fix
  if (req.originalUrl === '/favicon.ico') {
    return res.sendFile(path.resolve('./public/vite.svg'));
  }
  let url = req.originalUrl;
  // ! SSR Render - Do not Edit if you don't know what heare whats going on
  let template, render;
  try {
    if (!isProduction) {
      template = await vite.transformIndexHtml(
        url,
        await fs.readFile(resolve('index.html'), 'utf-8')
      );
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      const template = await fs.readFile(
        resolve('dist/client/index.html'),
        'utf-8'
      );

      // Load the manifest Vite generated with --ssrManifest
      const manifest = JSON.parse(
        await fs.readFile(
          resolve('./dist/client/.vite/ssr-manifest.json'),
          'utf-8'
        )
      );

      const { render } = await import('./dist/server/entry-server.js');
      const { html } = render(req.originalUrl);
      const entryChunk = manifest['src/entry-client.tsx']; // adjust if entry name differs
      const cssFiles = new Set(entryChunk.css || []);

      (entryChunk.imports || []).forEach((id) => {
        (manifest[id].css || []).forEach((css) => cssFiles.add(css));
      });

      const styleLinks = [...cssFiles]
        .map((file) => `<link rel="stylesheet" href="/${file}" />`)
        .join('');
      const preloadLinks = (entryChunk.imports || [])
        .map(
          (id) => `<link rel="modulepreload" href="/${manifest[id].file}" />`
        )
        .join('');
      console.log('styleLinks', styleLinks);
      const finalHtml = template
        .replace('<!--app-html-->', html)
        .replace('</head>', `${styleLinks}${preloadLinks}</head>`);

      return res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(finalHtml);
    }

    // console.log('BEFORE rendered');
    // console.log('ssrManifes,', ssrManifest);
    const rendered = await render({ path: req.originalUrl }, ssrManifest);
    // console.log(rendered);
    const html = template.replace(`<!--app-html-->`, rendered ?? '');
    res.status(200).setHeader('Content-Type', 'text/html').end(html);
  } catch (error) {
    // ? You can Add Something Went Wrong Page
    // vite.ssrFixStacktrace(error);
    next(error);
  }
});

// ? Start http server
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
