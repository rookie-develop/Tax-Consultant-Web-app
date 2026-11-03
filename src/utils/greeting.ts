import { useState, useEffect, useCallback } from 'react';

/**
 * Calculates the device-local time-based greeting according to defined time brackets:
 * - 05:00 AM – 11:59 AM: Good Morning
 * - 12:00 PM – 04:59 PM: Good Afternoon
 * - 05:00 PM – 08:59 PM: Good Evening
 * - 09:00 PM – 04:59 AM: Good Night
 */
export function getTimeBasedGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  }
  if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  }
  if (hour >= 17 && hour < 21) {
    return 'Good Evening';
  }
  return 'Good Night';
}

/**
 * Hook that provides a real-time, device-local greeting string.
 * Automatically recalculates at time boundaries, on visibility change (app resume / phone unlock),
 * window focus, and pageshow events, avoiding unnecessary re-renders when the greeting hasn't changed.
 */
export function useDynamicGreeting(): string {
  const [greeting, setGreeting] = useState<string>(() => getTimeBasedGreeting());

  const checkAndUpdate = useCallback(() => {
    const current = getTimeBasedGreeting();
    setGreeting((prev) => (prev !== current ? current : prev));
  }, []);

  useEffect(() => {
    // Initial sync
    checkAndUpdate();

    // Check periodically every 30 seconds to catch greeting boundary crossings smoothly
    const intervalId = window.setInterval(checkAndUpdate, 30000);

    // Sync immediately when the app resumes from background or phone is unlocked
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAndUpdate();
      }
    };

    const handleFocus = () => {
      checkAndUpdate();
    };

    const handlePageShow = () => {
      checkAndUpdate();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [checkAndUpdate]);

  return greeting;
}
