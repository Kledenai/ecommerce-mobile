function ensureString(value: string | null): string {
  return value === null ? '' : value;
}

export default ensureString;
