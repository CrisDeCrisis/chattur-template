const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-800">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border-4 border-t-4 border-t-transparent border-slate-900 dark:border-slate-100 rounded-full animate-spin"></div>
                <span className="text-slate-900 dark:text-slate-100">Cargando...</span>
            </div>
        </div>
    );
};

export default Loading;