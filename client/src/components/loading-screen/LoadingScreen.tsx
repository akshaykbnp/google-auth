import React from "react"

const LoadingScreen: React.FC = () => {
    return (<>
        <div className="h-screen w-screen absolute top-0 left-0 z-10 flex justify-center items-center">
            <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-l-neutral-500" />
        </div>
    </>)
}

export default LoadingScreen;