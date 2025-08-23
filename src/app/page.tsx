import { ModeToggle } from '@/components/custom/ModeToggle';
import Dashboard from './dashboard/page';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500">
      <Dashboard />
    </div>
  );
}
