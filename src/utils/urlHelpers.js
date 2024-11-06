export function formatHeadlineForUrl(headline) {
  if (!headline) return '';
  
  // First, clean the headline
  const cleanHeadline = headline
    .replace(/[''"]/g, '') // Remove quotes and apostrophes
    .replace(/\./g, '') // Remove periods
    .replace(/[,]/g, '') // Remove commas
    .replace(/[!]/g, '') // Remove exclamation marks
    .replace(/[?]/g, '') // Remove question marks
    .replace(/[:]/g, '') // Remove colons
    .replace(/[;]/g, '') // Remove semicolons
    .replace(/\(/g, '') // Remove opening parentheses
    .replace(/\)/g, '') // Remove closing parentheses
    .replace(/\[/g, '') // Remove opening brackets
    .replace(/\]/g, '') // Remove closing brackets
    .replace(/&/g, 'and') // Replace & with 'and'
    .replace(/\$/g, '') // Remove dollar signs
    .replace(/@/g, 'at') // Replace @ with 'at'
    .replace(/#/g, '') // Remove hash tags
    .replace(/\+/g, 'plus') // Replace + with 'plus'
    .replace(/=/g, '') // Remove equals signs
    .replace(/\*/g, '') // Remove asterisks
    .replace(/\\/g, '') // Remove backslashes
    .replace(/\//g, '') // Remove forward slashes
    .trim()
    .toLowerCase(); // Convert to lowercase before encoding

  // Then encode and format
  return encodeURIComponent(cleanHeadline)
    .replace(/%20/g, '-') // Replace spaces with dashes
    .replace(/%2D/g, '-') // Keep existing dashes
    .replace(/%2F/g, '-') // Replace forward slashes with dashes
    .replace(/-+/g, '-'); // Replace multiple dashes with single dash
}

export function decodeHeadlineFromUrl(urlHeadline) {
  if (!urlHeadline) return '';
  
  try {
    // First decode the URL
    const decoded = decodeURIComponent(urlHeadline)
      .replace(/-/g, ' ') // Replace dashes with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    return decoded;
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