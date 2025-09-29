"use client";

import React, { lazy, Suspense } from 'react';

const PixelWave = lazy(() => import('./PixelWave'));

interface LazyPixelWaveProps {
  colors?: string[];
  pixelSize?: number;
  speed?: number;
  fade?: number;
  mouseTracking?: boolean;
  direction?: 'down' | 'up' | 'random';
  borderWidth?: number;
  minPixelSize?: number;
  maxPixelSize?: number;
  explosionRadius?: number;
  initialEnabled?: boolean;
}

export default function LazyPixelWave(props: LazyPixelWaveProps) {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black opacity-80" />}>
      <PixelWave {...props} />
    </Suspense>
  );
}