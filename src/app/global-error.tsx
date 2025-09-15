'use client';
import { Button } from '@/components/ui/button';

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="w-screen flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-white">404 - Page Not Found</h1>
          <h2>Something went wrong!</h2>
          <p>{error.message}</p>
          <Button variant="secondary" onClick={() => reset()}>
            Go Back
          </Button>
        </div>
      </body>
    </html>
  );
}
