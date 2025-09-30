'use client';

import { cn } from '@/lib/utils';

interface Step {
    title: string;
    description?: string;
}

interface StepsProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}

export function Steps({ steps, currentStep, className }: StepsProps) {
    return (
        <div className={cn("w-full", className)}>
            <div className="relative flex justify-between">
                {steps.map((step, index) => {
                    const isActive = currentStep === index;
                    const isCompleted = currentStep > index;
                    
                    return (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div className="flex items-center w-full">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                                    isActive && "border-primary bg-primary text-primary-foreground",
                                    isCompleted && "border-primary bg-primary text-primary-foreground",
                                    !isActive && !isCompleted && "border-muted bg-background"
                                )}>
                                    {isCompleted ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={cn(
                                        "flex-1 h-0.5 mx-2",
                                        isCompleted ? "bg-primary" : "bg-muted"
                                    )} />
                                )}
                            </div>
                            <span className={cn(
                                "mt-2 text-xs font-medium text-center",
                                (isActive || isCompleted) ? "text-primary" : "text-muted-foreground"
                            )}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}