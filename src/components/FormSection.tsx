import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  rightElement?: ReactNode;
  isCompact?: boolean;
}

export default function FormSection({ title, children, rightElement, isCompact = false }: FormSectionProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className={`${isCompact ? 'text-base' : 'text-lg'} font-medium text-gray-800`}>{title}</h2>
        {rightElement}
      </div>
      <div className={isCompact ? 'text-sm' : ''}>{children}</div>
    </div>
  );
} 