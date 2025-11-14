/**
 * Cleans up the script content by removing unsupported tags and extracting valid content.
 * - Extracts `src` for external scripts.
 * - Removes the `<script>` tags and keeps only the inline JavaScript if present.
 * - Strips out unsupported or invalid parts.
 *
 * @param scriptString - The raw script string from settings.
 * @returns An object containing `src` for external scripts or `inline` for inline scripts.
 */

export function cleanScriptContent(scriptString: string): { src?: string; inline?: string } {
  const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/i // Matches <script>...</script>
  const srcRegex = /src="([^"]+)"/i // Matches src attribute inside <script>

  const match = scriptString.match(scriptRegex)
  if (!match) {
    // If no <script> tag is found, treat it as unsupported
    console.warn('No valid <script> tag found')
    return {}
  }

  const [, attributes, content] = match
  const srcMatch = attributes.match(srcRegex)

  if (srcMatch) {
    // External script with src attribute
    return { src: srcMatch[1] }
  }

  if (content.trim()) {
    // Inline script content
    return { inline: content.trim() }
  }

  return {}
}
