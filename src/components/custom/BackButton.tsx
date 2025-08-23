'use client';

import { Undo2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div>
      <Button variant="outline" onClick={handleBack}>
        <Undo2 className="w-4 h-4" />
        <p className="truncate">Go Back</p>
      </Button>
    </div>
  );
};

export default BackButton;
