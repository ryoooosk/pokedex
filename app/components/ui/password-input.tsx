import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '~/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
      <div className={cn('relative w-full h-10', className)}>
        <input
          type={isShowPassword ? 'text' : 'password'}
          className={cn(
            'flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="absolute inset-y-0 right-0 flex items-center mr-3">
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </span>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
