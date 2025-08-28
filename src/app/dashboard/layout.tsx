export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {children}
    </div>
  );
}
