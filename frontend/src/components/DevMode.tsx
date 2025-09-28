"use client";

// Mode développement rapide - désactive les animations coûteuses
export const DEV_FAST_MODE = process.env.NODE_ENV === 'development';

// Wrapper conditionnel pour les animations
export function ConditionalMotion({
  children,
  enabled = !DEV_FAST_MODE,
  fallback = null
}: {
  children: React.ReactNode;
  enabled?: boolean;
  fallback?: React.ReactNode;
}) {
  if (!enabled) {
    return fallback || children;
  }
  return children;
}