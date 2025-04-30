import Link from 'next/link';

interface NavButtonsProps {
  backLink: string;
  backText: string;
  nextLink: string;
  nextText: string;
  isCompact?: boolean;
}

export default function NavButtons({ 
  backLink, 
  backText, 
  nextLink, 
  nextText, 
  isCompact = false 
}: NavButtonsProps) {
  const sizeClasses = isCompact ? 'px-4 py-1.5 text-sm' : 'px-6 py-2';
  
  return (
    <div className="mt-4 flex justify-between">
      <Link 
        href={backLink} 
        className={`text-blue-600 ${sizeClasses} rounded flex items-center hover:text-blue-700 transition-colors`}
      >
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {backText}
      </Link>
      
      <Link 
        href={nextLink} 
        className={`bg-blue-600 text-white ${sizeClasses} rounded flex items-center hover:bg-blue-700 transition-colors`}
      >
        {nextText}
        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
} 