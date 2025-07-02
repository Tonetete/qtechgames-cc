import React, { ProfilerOnRenderCallback } from 'react';

interface ProfilerProps {
  id: string;
  children: React.ReactNode;
}

export const performanceData: Record<
  string,
  { renderCount: number; totalTime: number }
> = {};

export const ProfilerComponent: React.FC<ProfilerProps> = ({
  id,
  children,
}) => {
  const onRender: ProfilerOnRenderCallback = (
    profilerId,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) => {
    if (!performanceData[profilerId]) {
      performanceData[profilerId] = { renderCount: 0, totalTime: 0 };
    }

    performanceData[profilerId].renderCount += 1;
    performanceData[profilerId].totalTime += actualDuration;

    console.log(
      `[Profiler] ${profilerId} - Render #${performanceData[profilerId].renderCount}`,
    );
    console.log(`  Actual Duration: ${actualDuration.toFixed(2)}ms`);
    console.log(`  Base Duration: ${baseDuration.toFixed(2)}ms`);
  };

  return (
    <React.Profiler id={id} onRender={onRender}>
      {children}
    </React.Profiler>
  );
};
