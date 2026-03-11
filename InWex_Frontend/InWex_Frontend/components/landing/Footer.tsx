"use client";

import { ChevronsUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        const topElement = document.getElementById('top');
        if (topElement) {
            topElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-15 flex flex-col items-center">
            <button
                onClick={scrollToTop}
                className="mb-8 text-sm tracking-wider hover:text-gray-300 transition-colors uppercase flex flex-col items-center gap-1"
            >
                <ChevronsUp size={24} />
                Back to Top
            </button>

            <p className="text-sm text-gray-400">
                @2026 <span className="text-white">Inwex</span> All Rights Reserved.
            </p>
        </div>
    )
}

export default Footer