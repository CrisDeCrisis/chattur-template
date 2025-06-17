import { ChatPage, LoadingPage, MarketingPage, MetricsPage, ReviewsPage } from '@/pages';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';


export const AppRouter = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/marketing" element={<MarketingPage />} />
                <Route path="/metrics" element={<MetricsPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
            </Routes>
        </Suspense>
    );
};