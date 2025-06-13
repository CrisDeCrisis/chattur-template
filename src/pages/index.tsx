import { lazy } from 'react';

export const LoadingPage = lazy(() => import('./Loading'));
export const MarketingPage = lazy(() => import('./Marketing'));
export const MetricsPage = lazy(() => import('./Metrics'));
export const ReviewsPage = lazy(() => import('./Reviews'));