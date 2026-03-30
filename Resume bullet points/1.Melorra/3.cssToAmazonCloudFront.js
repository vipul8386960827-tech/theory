/*
 HOW WE MOVE ASSETS TO AWS CLOUDFRONT (CDN)

 1. Store static assets in a storage service (usually AWS S3)
 - Upload images, CSS, JS, fonts, etc. to an S3 bucket

 2. Create a CloudFront distribution
 - Set S3 bucket as the "origin"
 - CloudFront acts as CDN (serves files globally)

 3. Configure caching
 - Set cache-control headers (max-age, immutable)
 - CloudFront caches assets at edge locations

 4. Get CloudFront URL
 - Example: https:d123abc.cloudfront.net

 5. Replace asset URLs in your app
 - Instead of: /images/logo.png
 - Use: https:d123abc.cloudfront.net/images/logo.png

 6. Update build/config (React / Next.js)
 - Set assetPrefix or basePath (Next.js)
 - Or configure webpack publicPath

 7. Enable compression
 - Turn on Gzip/Brotli in CloudFront for faster delivery

 8. Versioning / cache busting
 - Use hashed filenames (main.abc123.js)
 - Ensures users get updated files after deploy

 9. Invalidation (optional)
 - If needed, clear CloudFront cache manually
 - Or rely on versioned filenames instead

 10. HTTPS & security
 - Attach SSL certificate (ACM)
 - Serve assets over HTTPS

 RESULT
 - Faster load times (served from nearest edge)
 - Reduced load on origin server
 - Better SEO & performance (Core Web Vitals)

 */
