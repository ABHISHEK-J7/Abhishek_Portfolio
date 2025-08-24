import React from 'react';

function AppLogo({
    size = 100,
    className = "",
    ...props
}) {
    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{
                width: size,
                height: size,
            }}
            {...props}
        >
            {/* Background Circle with Gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse-glow" />
            
            {/* Inner Circle */}
            <div className="absolute inset-1 rounded-full bg-background" />
            
            {/* Letter A */}
            <div className="relative z-10 flex items-center justify-center">
                <svg
                    width={size * 0.6}
                    height={size * 0.6}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Letter A Path */}
                    <path
                        d="M50 10 L85 85 L75 85 L65 60 L35 60 L25 85 L15 85 L50 10 Z M40 50 L60 50 L50 25 L40 50 Z"
                        fill="url(#letterGradient)"
                        stroke="url(#letterGradient)"
                        strokeWidth="2"
                    />
                    
                    {/* Gradient Definitions */}
                    <defs>
                        <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0066FF" />
                            <stop offset="50%" stopColor="#00FF88" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
    );
}

export default AppLogo;
