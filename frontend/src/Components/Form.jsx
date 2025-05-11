import React from 'react';

const ContactForm = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-between items-center bg-black pt-[30px]"
      style={{
        backgroundImage: `url(/contact.png)`, // Ensure this is the correct image
        backgroundSize: 'contain', // Show the full image without cropping
        backgroundPosition: 'center top', // Align the image to the top
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Title at the top, 30px from the top */}
      <h2 className="text-5xl font-bold italic text-white mt-0 text-center tracking-wider">
        LIFEFINDER
      </h2>

      {/* Form section at the bottom, 30px from the bottom */}
      <div className="flex flex-col items-center mb-[30px] mt-16">
        <form className="flex flex-col gap-3 w-full max-w-xs px-4">
          {/* Name Input */}
          <div className="flex flex-col">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full p-2 bg-transparent border-b border-white text-white placeholder-white placeholder-opacity-80 focus:outline-none text-xs"
            />
          </div>

          {/* Email and Phone Inputs in the Same Row */}
          <div className="flex flex-row gap-3">
            {/* Email Input */}
            <div className="flex flex-col w-1/2">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 bg-transparent border-b border-white text-white placeholder-white placeholder-opacity-80 focus:outline-none text-xs"
              />
            </div>

            {/* Phone Input */}
            <div className="flex flex-col w-1/2">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                className="w-full p-2 bg-transparent border-b border-white text-white placeholder-white placeholder-opacity-80 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="flex flex-col">
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows="2"
              className="w-full p-2 bg-transparent border-b border-white text-white placeholder-white placeholder-opacity-80 focus:outline-none resize-none text-xs"
            />
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              className="h-4 w-4 text-white border-white rounded"
            />
            <label htmlFor="privacy" className="text-[11px] text-white uppercase font-normal">
              I AGREE TO THE PRIVACY POLICY
            </label>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center mt-2">
            <button
              type="submit"
              className="bg-[#1E3A5F] text-white font-semibold py-2 px-6 rounded-full text-sm hover:bg-[#2A4A7F] transition-colors uppercase"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;