# BE Smart Coaching Center Pvt. Ltd.

React + TypeScript + Vite website prepared for GitHub Pages.

## Run in VS Code

1. Extract this ZIP.
2. In VS Code, choose **File → Open Folder** and select the `be-smart-coaching-center-seo-ready` folder.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm ci
   npm run dev
   ```

5. Open the local address shown in the terminal.

## Upload this project to the existing GitHub repository

Repository: https://github.com/mrsky3155-eng/Be-smart-coaching-center

If the repository is currently empty, open its folder in VS Code and run:

```bash
git init
git branch -M main
git add .
git commit -m "Prepare website for GitHub Pages and SEO"
git remote add origin https://github.com/mrsky3155-eng/Be-smart-coaching-center.git
git push -u origin main
```

If VS Code says `remote origin already exists`, run `git remote -v` first. If it points to the correct repository, do not add it again; just run `git push -u origin main`. If the local folder already has Git initialized, do not run `git init` again.

> This ZIP deliberately excludes `.git`, `node_modules`, and generated `dist` output. Do not upload `.env` files, API keys, or passwords.

## Turn on GitHub Pages

1. Open the repository on GitHub.
2. Select **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy website to GitHub Pages** to finish successfully.
5. Your website URL should be: https://mrsky3155-eng.github.io/Be-smart-coaching-center/

Every push to the `main` branch will build and deploy the latest version automatically.

## SEO setup

The project includes a descriptive title and meta description, canonical URL, Open Graph and Twitter metadata, educational organization structured data, `robots.txt`, and `sitemap.xml`.

After the website is live:

1. Open Google Search Console: https://search.google.com/search-console/
2. Add a **URL prefix** property for the exact GitHub Pages URL above.
3. Verify ownership using one of the methods Google offers. If you use an HTML verification file, place it in `public/` so Vite copies it to the published site, then commit and push again.
4. In Search Console, submit this sitemap: `https://mrsky3155-eng.github.io/Be-smart-coaching-center/sitemap.xml`
5. Use **URL Inspection → Test live URL → Request indexing** for the homepage.

Indexing is not immediate or guaranteed. A sitemap helps discovery; it does not guarantee rankings. Since this is hosted on a GitHub Pages subdomain, you cannot add DNS records for a custom domain here. A custom domain requires owning/configuring the domain and setting it up in GitHub Pages.

## Important limitation

This is a static GitHub Pages deployment. Front-end pages can load, but GitHub Pages does not run a Node/Express backend or securely store secrets. Any admin/student login, admission records, or portal data that depends on a backend must be connected to a separately hosted API and database before being used for real users. Review demo/mock data and authentication before using this site operationally.
