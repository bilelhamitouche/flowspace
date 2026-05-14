export function safeJSONParse(content: any) {
  try {
    return JSON.parse(content);
  } catch (err) {
    null;
  }
}
