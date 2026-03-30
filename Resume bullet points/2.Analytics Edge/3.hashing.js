/*
📌 Problem:
- In production, browsers cache JS/CSS files aggressively.
- After deployment, users were sometimes still seeing old UI due to cached assets.

📌 Solution using Webpack (Webpack 5):

1. Used content-based hashing for cache busting
   - Webpack feature: contenthash
   - Ensures file name changes when file content changes

   Example:
   output: {
     filename: '[name].[contenthash].js',
     chunkFilename: '[name].[contenthash].js'
   }

   ✔ Result:
   - Old file: app.abc123.js
   - New file: app.xyz999.js
   - Browser automatically fetches new file instead of cached one

----------------------------------------------------

2. Cleaned old build artifacts
   - Used Webpack built-in feature:

   output: {
     clean: true
   }

   OR CleanWebpackPlugin (older setups)

   ✔ Result:
   - Prevents outdated files from staying in build folder
   - Avoids accidental stale references

----------------------------------------------------

3. Ensured correct file injection into HTML
   - Used HtmlWebpackPlugin

   new HtmlWebpackPlugin({
     template: './src/index.html'
   })

   ✔ Result:
   - Automatically injects latest hashed JS/CSS files into HTML
   - No manual updates needed

----------------------------------------------------

📌 Final Impact:
- Users always get latest production build
- Eliminated stale cache issues
- Improved reliability of deployments
*/

/*
📌 Context (Next.js setup):
- In Next.js, Webpack is internally managed by the framework.
- We don't directly create or maintain a webpack.config.js file like in traditional React setups.

----------------------------------------------------

📌 Where changes are actually made:

1. next.config.js
   - This is the main file where we can extend/override Webpack behavior in Next.js.

   Example:
   module.exports = {
     webpack: (config, { isServer }) => {
       // custom webpack modifications here
       return config;
     }
   }

----------------------------------------------------

📌 How I handled cache busting in Next.js:

1. Automatic cache busting (default behavior):
   - Next.js already uses content hashing for JS/CSS files in production builds.
   - So filenames like:
     /_next/static/chunks/main.abc123.js
   - are generated automatically.

----------------------------------------------------

2. Ensuring latest builds (deployment-level control):
   - I relied on Next.js build system + proper deployment strategy:
     - next build
     - next start
   - Each build generates new hashed assets.

----------------------------------------------------

3. CDN / browser cache control (important part I handled):
   - Configured proper cache headers (via server / CDN like Vercel/Nginx)
   - Ensured HTML is not aggressively cached, while static assets are long cached.

----------------------------------------------------

📌 Final takeaway:
- In Next.js, we don't manually configure Webpack for hashing.
- Instead, Next.js handles it internally.
- We extend Webpack only via next.config.js if needed.
*/

/*
📌 In Next.js, static assets are already handled with content hashing automatically,
so under normal conditions, manual Webpack-level cache busting is not required.

📌 However, in our case we observed issues in the deployment pipeline/CDN layer
where stale assets were being served despite correct Next.js builds.

📌 To mitigate this quickly, we introduced a temporary fix at the configuration/deployment level
to ensure users always received the latest assets.

📌 Once the root cause was identified and fixed in the pipeline/CDN caching strategy,
this workaround was planned to be removed.

📌 So this was a pragmatic production fix to ensure reliability during an active issue,
not a replacement for Next.js’s default behavior.
*/

const nextConfig = {
  webpack: (config) => {
    config.output.filename = `static/chunks/[name].[contenthash].js`;
    config.output.chunkFilename = `static/chunks/[name].[contenthash].js`;
    return config;
  },
};

module.exports = nextConfig;
