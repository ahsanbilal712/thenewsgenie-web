export function formatHeadlineForUrl(headline) {
  if (!headline) return '';
  
  return encodeURIComponent(headline.toLowerCase())
    .replace(/%20/g, '-')
    .replace(/%2D/g, '-') // Keep existing dashes
    .replace(/%2F/g, '-') // Replace forward slashes with dashes
    .replace(/%27/g, '') // Remove apostrophes
    .replace(/%22/g, '') // Remove quotes
    .replace(/-+/g, '-'); // Replace multiple dashes with single dash
}

export function decodeHeadlineFromUrl(urlHeadline) {
  if (!urlHeadline) return '';
  
  try {
    return decodeURIComponent(urlHeadline
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    );
  } catch (error) {
    console.error('Error decoding headline:', error);
    return urlHeadline.replace(/-/g, ' ').trim();
  }
}

// Helper function to test URL formatting
export function testHeadlineFormatting(headline) {
  console.log('Original:', headline);
  const formatted = formatHeadlineForUrl(headline);
  console.log('Formatted:', formatted);
  const decoded = decodeHeadlineFromUrl(formatted);
  console.log('Decoded:', decoded);
  return { formatted, decoded };
} 