// Pre-generate API routes for static export
export function generateStaticParams() {
  return [
    { query: 'all' },
    { query: 'github' },
    { query: 'aws' },
    { query: 'cloud' },
    { query: 'hosting' },
    { query: 'development' },
    { query: 'design' },
    { query: 'student' },
  ];
}