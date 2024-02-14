import React from 'react';

interface CardProps {
    title?: string;
    imageSrc?: string;
    description?: string;
}

const Card: React.FC<CardProps> = ({ title, imageSrc, description }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            {imageSrc && <img className="w-full" src={imageSrc} alt={title || "Card Image"} />}
            <div className="px-6 py-4">
                {title && <div className="font-bold text-xl mb-2">{title}</div>}
                {description && <p className="text-gray-700 text-base">{description}</p>}
            </div>
            <div className="px-6 pt-4 pb-2">
                {/* You can add additional content here, like tags or buttons */}
            </div>
        </div>
    );
}

export default Card;
