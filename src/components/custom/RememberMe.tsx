import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface RememberMeProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

export function RememberMe({
  checked,
  onCheckedChange,
  label = 'Remember me',
  id = 'remember',
  className = '',
}: RememberMeProps) {
  return (
    <div className={`flex justify-center items-center align-middle gap-2 ${className}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
      />
      <Label htmlFor={id} className="text-sm text-muted-foreground cursor-pointer">
        {label}
      </Label>
    </div>
  );
}
