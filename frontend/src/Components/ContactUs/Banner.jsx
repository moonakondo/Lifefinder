import React from 'react';

const ContactUsBanner = () => {
    return (
        <div className="relative bg-contact-image">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative max-w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-start">
                <h1 className="text-4xl font-extrabold text-white">
                    Get in Touch with Us
                </h1>
                <p className="text-[4vw] md:text-[1.4vw] w-[70vw] md:w-[43vw] mb-[10px] text-white mt-[60px]">
                    We are here to assist you with any inquiries or concerns you may have. Our team is dedicated
                    to providing you with the best support possible. Feel free to reach out to us, and we will
                    respond promptly to ensure all your questions are addressed.
                </p>
            </div >
        </div >
    );
};

export default ContactUsBanner;
