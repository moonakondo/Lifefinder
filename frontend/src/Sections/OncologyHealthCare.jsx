// ArticleSection.jsx

import React from "react";
import { FaFacebookF, FaTwitter, FaPrint, FaLink } from "react-icons/fa";

const OncologyHeroSection = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 w-full">
      {/* Article Header */}
      <div className="max-w-full container mx-auto bg-white shadow-md rounded-tl-md p-6">
        {/* Title and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Heavyweight Champion Daniel Dubois Boxing Clever to Boost Prostate
            Cancer Awareness
          </h1>
        </div>

        {/* Author and Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="text-gray-600">
            <span>By Prostate Cancer UK</span> | <span>September 21, 2024</span>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <span className="text-sm text-gray-500">Tags:</span>
            <span className="text-sm text-blue-600">Our Supporters</span>
            <span className="text-sm text-blue-600">Sport</span>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <img
            src="/assests/ddpic3.webp"
            alt="Daniel Dubois Victory"
            className="w-full h-[50%] rounded-md object-contain"
          />
        </div>

        {/* Article Content */}
        <div className="space-y-6 text-gray-700">
          <p>
            Champion boxer Daniel Dubois claimed a sensational victory in his
            hotly anticipated heavyweight showdown against Anthony Joshua on
            Saturday night. And at one of the biggest sporting events of 2024,
            our iconic ‘Man of Men’ logo took centre stage.
          </p>

          {/* Image Placeholder */}

          <p>
            ‘Dynamite’ Dubois made history by defeating Joshua in front of
            96,000 fans at Wembley Stadium - and millions of television viewers
            around the world - to retain the IBF heavyweight world title on 21
            September.
          </p>

          <p>
            And he sported our famous logo on his shorts throughout the dramatic
            contest, which saw the 27-year-old Londoner come out on top after
            five rounds.
          </p>

          <p>
            Daniel also championed our cause by wearing the ‘Man of Men’ emblem
            on his training kit and in his pre-fight media interviews during a
            week of build-up to one of the biggest domestic boxing match-ups in
            recent years.
          </p>

          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            “I’ve always wanted to use my position as a sportsman to impact
            society in a positive way,” said Daniel, who became the IBF
            heavyweight champion in June after Ukrainian fighter Oleksandr Usyk
            vacated the belt.
          </blockquote>

          <p>
            Daniel Dubois’ message to men? Check your risk. Daniel says finding
            prostate cancer early could be a lifesaver – and he’s urging men to
            take the all-important first step by checking their risk online.
          </p>

          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            “I now know prostate cancer affects 1 in 8 men and it’s double the
            risk if you’re Black. Those stats are unacceptable. But it’s also a
            disease which, if you can catch it early, is treatable.
          </blockquote>

          <p>
            “Prostate Cancer UK are in the corner of all men and their families,
            working tirelessly to educate men about the risks of this disease.
            Please look at their website for more information or take their
            30-second online risk checker. It may just save your life.”
          </p>

          {/* Secondary Image */}
          <div className="flex justify-start w-full">
            <img
              src="/assests/dd-1.webp"
              alt="Wembley Stadium Fight"
              className="w-full max-w-full h-[450px] rounded-xl object-contain"
            />
          </div>

          <p>
            Daniel’s title fight against Joshua was billed as one of the major
            sporting moments of the year, with a record crowd packed inside
            Wembley Stadium to see the two rivals go head to head.
          </p>

          <p>
            The epic contest didn’t disappoint, with Joshua knocked down in
            stunning fashion in the opening round. And he was sent to the canvas
            several more times before Daniel landed a knockout blow in the fifth
            round to claim a dominant victory – the biggest of his career so
            far.
          </p>

          <p>
            This huge sporting occasion was also a massive moment for prostate
            cancer awareness, with our logo in the spotlight from start to
            finish.
          </p>

          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            “Prostate cancer is treatable – if you catch it early,” Laura Kerby,
            Chief Executive of Prostate Cancer UK.
          </blockquote>

          <p>
            Laura Kerby, Chief Executive of Prostate Cancer UK, congratulated
            Daniel on his remarkable victory in the ring – and thanked him for
            stepping forward to share his important message with boxing fans in
            all corners of the country.
          </p>

          <p>
            “We’re incredibly grateful to Daniel and his team for showing their
            support for us during Saturday’s huge heavyweight showdown, and in
            the build-up to such an exciting event,” said Laura.
          </p>

          <p>
            “This collaboration not only put us at the heart of a seismic
            sporting occasion at Wembley Stadium - it also enabled us to reach
            millions of people watching at home.
          </p>

          <p>
            “We’re proud that football managers, sports personalities,
            presenters and celebrities continue to wear our iconic ‘Man of Men’
            badge to raise awareness of this disease. We know that our logo has
            saved lives and we’re delighted to continue our important work
            alongside the boxing community.
          </p>

          <p>
            “Prostate cancer is curable if caught early but men don’t usually
            get symptoms in the early stages of the disease. So it’s vital that
            men know their risk. And our online risk checker is the first step.
          </p>

          <p>
            “A huge congratulations to Daniel on his incredible victory. And we
            thank him, his team at NVASEG and the entire boxing community for
            all their support.”
          </p>

          <p className="font-semibold text-center text-blue-600">
            It only takes 30 seconds to check your risk of prostate cancer.{" "}
            <a href="https://prostatecanceruk.org" className="underline">
              Check your risk now
            </a>{" "}
            and share our online risk checker with your mates and the men in
            your family.
          </p>
        </div>
      </div>

      <div className="max-w-full container mx-auto bg-white shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              src="/assests/profile-insta.jpg"
              alt="Daniel Dubois"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">dynamite_daniel_dubois</h3>
              <span className="text-sm text-gray-500">
                @dynamite_daniel_dubois
              </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/sharer.php?u=https://prostatecanceruk.org/about-us/news-and-views/2024/09/daniel-dubois-boosts-awareness/&text=Daniel%20Dubois%20boosts%20awareness"
              aria-label="Share on Facebook"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com/intent/tweet?url=https://prostatecanceruk.org/about-us/news-and-views/2024/09/daniel-dubois-boosts-awareness/&text=Daniel%20Dubois%20boosts%20awareness"
              aria-label="Share on Twitter"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Print Post"
              className="text-gray-600 hover:text-gray-800"
            >
              <FaPrint size={20} />
            </a>
            <a
              href="https://prostatecanceruk.org/about-us/news-and-views/2024/09/daniel-dubois-boosts-awareness"
              aria-label="View Article"
              className="text-green-600 hover:text-green-800"
            >
              <FaLink size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            1 in 4 Black men will get prostate cancer – that’s double the risk
            of the rest of the population.
          </p>
          <p>
            That’s why I wanted to raise awareness by wearing @prostatecanceruk
            logo during tonight’s fight at @wembleystadium.
          </p>
          <p>
            Check your risk and share the 30-second online risk checker with
            your loved ones. You can find the link in my bio.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-blue-600">#ProstateCancerUK</span>
            <span className="text-sm text-blue-600">#MensHealth</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OncologyHeroSection;
