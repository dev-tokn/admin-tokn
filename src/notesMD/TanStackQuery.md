# TanStack Query Setup

This project uses TanStack Query (React Query) for server state management.

## Configuration

### QueryClient

- **Stale Time**: 5 minutes (data stays fresh)
- **Garbage Collection Time**: 10 minutes (unused data cleanup)
- **Retry Logic**:
  - Queries: Up to 3 retries, skip 4xx errors
  - Mutations: Up to 2 retries, skip 4xx errors
- **Refetch**: On reconnect, not on window focus

### DevTools

- Available in development mode only
- Access via bottom-left button
- Shows query cache, mutations, and performance metrics

## Usage Examples

### Basic Query Hook

```tsx
import { useBusinessesQuery } from '@/lib/hooks';

function MyComponent() {
  const { data, isLoading, error, refetch } = useBusinessesQuery({
    page: 1,
    limit: 10,
    token: 'your-auth-token',
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render your data */}</div>;
}
```

### Query with Parameters

```tsx
const { data } = useBusinessesQuery({
  page: 2,
  limit: 20,
  status: 'verified',
  search: 'company name',
  token: authToken,
});
```

### Manual Refetch

```tsx
const { refetch, isRefetching } = useBusinessesQuery({ token });

<Button onClick={() => refetch()} disabled={isRefetching}>
  Refresh Data
</Button>;
```

## Best Practices

1. **Query Keys**: Use descriptive, hierarchical keys
2. **Enabled Queries**: Only run queries when required data is available
3. **Error Handling**: Always handle loading and error states
4. **Stale Time**: Set appropriate stale times based on data freshness needs
5. **Refetch**: Use manual refetch for user-triggered updates

## Available Hooks

- `useBusinessesQuery` - Fetch paginated business data
- More hooks can be added as needed

## Adding New Queries

1. Create a new hook in `src/lib/hooks/`
2. Use the `useQuery` hook from `@tanstack/react-query`
3. Define appropriate query keys
4. Handle loading, error, and success states
5. Export from `src/lib/hooks/index.ts`
