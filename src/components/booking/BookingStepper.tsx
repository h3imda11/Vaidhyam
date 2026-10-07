import React from 'react';
import { Calendar, User, CheckCircle2, LucideIcon } from 'lucide-react';

export interface BookingStepItem {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const BOOKING_STEPS: BookingStepItem[] = [
  {
    id: 1,
    title: 'Select Time',
    subtitle: 'Mode, Date & Slot',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Patient Details',
    subtitle: 'Contact & Health Goal',
    icon: User,
  },
  {
    id: 3,
    title: 'Confirmation',
    subtitle: 'Review & Confirm',
    icon: CheckCircle2,
  },
];

interface BookingStepperProps {
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
  maxReachedStep?: number;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({
  currentStep,
  onStepClick,
  maxReachedStep = currentStep,
}) => {
  const totalSteps = BOOKING_STEPS.length;
  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full bg-white rounded-2xl border border-[#143D27]/10 p-4 sm:p-6 shadow-sm">
      {/* Mobile Stepper View (< 640px) */}
      <div className="sm:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2C6E49] text-white text-xs font-bold">
              {currentStep}
            </span>
            <span className="text-xs font-bold text-[#0C281B] uppercase tracking-wider">
              {BOOKING_STEPS[currentStep - 1]?.title}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#143D27]/60">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {/* Progress Bar for Mobile */}
        <div className="relative w-full h-2 bg-[#FAF8F5] border border-[#143D27]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2C6E49] to-[#C7A45A] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Clickable mini pill buttons for completed steps */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {BOOKING_STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <button
                key={step.id}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.id)}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center gap-1 ${
                  isCurrent
                    ? 'bg-[#2C6E49]/10 text-[#0C281B] border border-[#2C6E49]/30 font-bold'
                    : isCompleted
                    ? 'bg-[#E8F5E9] text-[#2C6E49] hover:bg-[#C8E6C9] cursor-pointer'
                    : 'bg-[#FAF8F5] text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{step.id}.</span>
                <span className="truncate">{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop / Tablet Stepper View (>= 640px) */}
      <div className="hidden sm:block">
        <div className="relative flex items-center justify-between">
          {/* Background Connecting Line */}
          <div
            className="absolute left-10 right-10 top-5 h-1 bg-[#FAF8F5] border-t border-b border-[#143D27]/10 -z-0"
            aria-hidden="true"
          />

          {/* Active / Completed Progress Line */}
          <div
            className="absolute left-10 top-5 h-1 bg-[#2C6E49] transition-all duration-500 ease-out -z-0"
            style={{
              width: `calc(${(progressPercent / 100) * 100}% - ${
                progressPercent === 100 ? '5rem' : '2.5rem'
              })`,
            }}
            aria-hidden="true"
          />

          {/* Steps */}
          {BOOKING_STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isUpcoming = step.id > currentStep;
            const isClickable = (isCompleted || step.id <= maxReachedStep) && onStepClick && !isCurrent;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center group"
                style={{ width: `${100 / totalSteps}%` }}
              >
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(step.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#2C6E49] text-white shadow-sm hover:scale-105 hover:bg-[#1E5235] cursor-pointer ring-4 ring-[#E8F5E9]'
                      : isCurrent
                      ? 'bg-[#0C281B] text-[#C7A45A] shadow-md ring-4 ring-[#C7A45A]/25 scale-110 font-extrabold'
                      : 'bg-white border-2 border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                  title={isClickable ? `Jump to ${step.title}` : undefined}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </button>

                {/* Step Titles */}
                <div className="mt-2.5 text-center">
                  <div
                    className={`text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'text-[#0C281B]'
                        : isCompleted
                        ? 'text-[#2C6E49]'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[10px] text-[#143D27]/60 font-medium">
                    {step.subtitle}
                  </div>
                </div>

                {/* Active Indicator Pulse */}
                {isCurrent && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#C7A45A] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
