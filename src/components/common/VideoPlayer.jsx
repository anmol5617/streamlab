import React, { useEffect, useState } from 'react';

function VideoPlayer(props) {
    const { videosList } = props;
    const [key, setKey] = useState(null);
    const [showVideo, setShowVideo] = useState(true);

    useEffect(() => {
        const trailer = videosList.find((item) => (
            item.site === "YouTube" && item.type === "Trailer"
        ));
        if (trailer) {
            setKey(trailer.key);
        }
    }, [videosList]);

    const handleClose = () => {
        setShowVideo(false);
    };

    return (
        <div className={`relative ${showVideo ? '' : 'hidden'}`}>
            {
                key ?
                <div className="relative aspect-video w-full">
                    <iframe
                        className='aspect-video w-full'
                        src={`https://www.youtube.com/embed/${key}?rel=0&autoplay=1&mute=1`}
                        title="YouTube video"
                        allowFullScreen
                    ></iframe>
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        onClick={handleClose}
                    >
                        <button
                            className="text-white text-3xl font-bold close-button"
                        >
                            ×
                        </button>
                    </div>
                </div>
                : "No video available"
            }
        </div>
    );
}

export default VideoPlayer;
