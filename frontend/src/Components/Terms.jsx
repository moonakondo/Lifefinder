import React, { useState, useEffect } from 'react';

function Terms() {
    const [isAccepted, setIsAccepted] = useState(false);
    useEffect(() => {
        const accepted = localStorage.getItem('termsAccepted');
        if (accepted) {
            setIsAccepted(true);
        } else {
            document.body.style.overflow = 'hidden'; // Disable scroll
        }
    }, []);

    useEffect(() => {
        if (isAccepted) {
            document.body.style.overflow = 'auto'; // Re-enable scroll
        }
    }, [isAccepted]);

    const handleAccept = () => {
        localStorage.setItem('termsAccepted', 'true');
        setIsAccepted(true);
    };

    if (isAccepted) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative flex flex-col shadow-2xl m-[5vw] rounded-[2vw] p-[2vh] h-[52vh] 2lg:h-[80vh] w-[70vw] 2lg:w-[40vw] h-max-content top-[1vh] bg-white">
                <p className="font-900 flex justify-center text-[4vw] 2lg:text-[2.2vw] text-blue-900 w-[100%] border-b-2">LIFEFINDER TERMS OF USE</p>
                <div className=" overflow-y-auto container mx-auto p-8">
        <h1 className="text-center text-2xl text-blue-900 font-semibold mb-8">ETHICAL CODES, COMPLIANCE</h1>
        <p className="italic text-center mb-8">
            Lifefinder is committed to upholding the highest standards of morality, respect, and compliance across all aspects of its platform.
            As a transborder and worldwide platform, Lifefinder acknowledges the sovereign identity and laws of each country it operates in and
            respects the diverse cultural and legal frameworks that govern healthcare practices.
        </p>
        <h2 className="font-bold mb-4">Key Principles and Commitments:</h2>
        <ol className="list-decimal list-inside space-y-4">
            <li>
                <strong className="font-bold">Sovereign Identity and Laws:</strong> Lifefinder recognizes and respects the sovereign identity and laws of each country it operates in.
                It adheres to local regulations and legislation concerning healthcare practices and digital technologies.
            </li>
            <li>
                <strong className="font-bold">Digital Health Initiatives:</strong> Lifefinder acknowledges the importance of digital technologies in promoting sustainable health systems and universal health coverage.
                It supports initiatives that integrate leadership, financial resources, and technological advancements to address key health priorities.
            </li>
            <li>
                <strong className="font-bold">Global Strategy:</strong> Lifefinder aligns with the global strategy for digital health, promoting the appropriate use of digital technologies as public goods adaptable to different countries and contexts.
                It advocates for equity in access to digital resources and protects individuals and populations against misinformation, cyber threats, and human rights violations.
            </li>
            <li>
                <strong className="font-bold">Digital Determinants of Health:</strong> Lifefinder recognizes the importance of digital literacy, access to equipment, broadband, and the internet in ensuring equitable access to digital health resources. It collaborates with different sectors and stakeholders to address digital disparities and promote inclusivity.
            </li>
            <li>
                <strong className="font-bold">Interoperability and Standards:</strong> Lifefinder prioritizes syntactic and semantic interoperability with WHO norms and standards to enable the seamless sharing of health information. It upholds principles of privacy, data security, and intellectual property to ensure the trust and safety of its users.
            </li>
            <li>
                <strong className="font-bold">People-Centered Approach:</strong> Lifefinder is committed to a people-centered, trust-based, and evidencebased approach to digital health. It prioritizes patient safety, ethics, affordability, and sustainability in all its endeavors, striving to empower individuals to make informed healthcare decisions
            </li>
            <li>
                <strong className="font-bold">Environmental Responsibility:</strong> Lifefinder acknowledges the growing global challenge of digital waste on health and the environment. It is committed to managing digital waste responsibly and minimizing its environmental footprint wherever possible
            </li>
        </ol>
            
            <p className='italic text-[1vw] mt-[2vh]'>By adhering to these ethical codes and compliance standards, Lifefinder seeks to foster a culture of integrity, transparency, and accountability in the digital healthcare ecosystem, ultimately advancing the well-being of individuals and communities worldwide.</p>

            <h1 className="text-center text-2xl text-blue-900 font-semibold mb-8 mt-[3vh]">CODE OF BUSINESS CONDUCT</h1>

            <ol>
            <li className='mt-[2vh]'>
                <strong className="font-bold">Compliance with Laws and Regulations:</strong> Lifefinder is dedicated to upholding the highest standards of legal compliance in all aspects of our operations. We require all employees,  contractors, partners, and stakeholders to comply with all applicable laws, regulations, and industry standards.
                <ol className='text-[1vw] font-600 mt-[2vh]'>
                   <li>- Familiarize yourself with relevant laws and regulations.</li>
                   <li>- Conduct all activities in accordance with legal requirements.</li>
                   <li>- Seek guidance from legal experts when uncertain about compliance matters.</li>
                </ol>
            </li>

            <li className='mt-[2vh]'>
            <strong className="font-bold">Protection of User Data and Privacy:</strong>
            Lifefinder places utmost importance on protecting user data and privacy. We implement robust data protection measures and adhere to strict privacy standards, including GDPR and CCPA.
            <ol className='text-[1vw] font-600 mt-[2vh]'>
                   <li>- Handle personal data securely and transparently.</li>
                   <li>- Obtain user consent before collecting or processing personal information.</li>
                   <li>- Comply with our Privacy Policy and applicable privacy laws.</li>
            </ol>
            </li>

            <li className='mt-[2vh]'>
            <strong className="font-bold">Impartiality and Neutrality:</strong>
            Lifefinder operates as an impartial platform for user-generated reviews and rankings of medical facilities and services. We maintain neutrality in presenting user opinions and experiences.

            <ol className='text-[1vw] mt-[2vh]'>
                   <li className='font-bold'>- Do not endorse or evaluate individual doctors or medical practitioners.</li>
                   <li>- Provide a platform for users to share unbiased feedback.</li>
                   <li>- Ensure fairness and transparency in the review and ranking process.</li>
                   <li className='font-bold'>- REFUSE ANY PAID PROMOTION, REVIEWS AND ROBOT TESTIMONIES by including an
                   Online Monitor, with a 24H moderator & Dispute commission before Reviw Publication.</li>
                   <li className='font-bold'>- Include Lifefinder Moderator** Court for Litigation & Amicable Settlement for both parties</li>
            </ol>
            
            </li>

            <li className='mt-[2vh]'>
            <strong className="font-bold">Protection of User Data and Privacy:</strong>
            Lifefinder places utmost importance on protecting user data and privacy. We implement robust data protection measures and adhere to strict privacy standards, including GDPR and CCPA.
            <ol className='text-[1vw] font-600 mt-[2vh]'>
                <li>- Handle personal data securely and transparently.</li>
                <li>- Obtain user consent before collecting or processing personal information.</li>
                <li>- Comply with our Privacy Policy and applicable privacy laws.</li>
            </ol>
          </li>

            <li className='mt-[2vh]'>
                <strong className="font-bold">Transparency and Accountability:</strong>
                Lifefinder values transparency and accountability in all interactions with users, partners, and stakeholders. We strive to provide clear and accurate information about our platform, services, and policies.
                <ol className='text-[1vw] font-600 mt-[2vh]'>
                    <li>- Communicate openly and honestly with stakeholders.</li>
                    <li>- Take responsibility for the quality and accuracy of published content.</li>
                    <li>- Address user concerns and feedback promptly and effectively.</li>
                </ol>
            </li>

            <li className='mt-[2vh]'>
                <strong className="font-bold">Conflict of Interest:</strong>
                Lifefinder employees and stakeholders are expected to avoid conflicts of interest that may compromise their judgment or integrity. This includes situations where personal interests conflict with the interests of Lifefinder or its users.
                <ol className='text-[1vw] font-600 mt-[2vh]'>
                    <li>- Disclose any actual or potential conflicts of interest promptly.</li>
                    <li>- Refrain from engaging in activities that could create conflicts of interest.</li>
                    <li>- Act in the best interests of Lifefinder and its users at all times.</li>
                </ol>
            </li>

            <li className='mt-[2vh]'>
                <strong className="font-bold">Moderation and Regulation of Content:</strong>
                Lifefinder moderates user-generated content to ensure compliance with our content guidelines and policies. We aim to maintain a respectful and constructive environment for all users.
                <ol className='text-[1vw] font-600 mt-[2vh]'>
                    <li>- Review user-generated content for compliance with our guidelines.</li>
                    <li>- Remove or edit content that violates our policies or is deemed harmful.</li>
                    <li>- Encourage constructive dialogue and respectful behavior among users.</li>
                </ol>
            </li>
            </ol>

            <h1 className="text-center text-2xl text-blue-900 font-semibold mb-8 mt-[3vh]">USER AGREEMENT
            </h1>
            <p className='italic text-[1vw]'>
            This User Agreement ("Agreement") is entered into between Lifefinder, Inc. ("Lifefinder") and the user ("User") accessing or using Lifefinder's platform, services, or website. By accessing or using Lifefinder's platform, services, or website, User agrees to be bound by the terms and conditions of this Agreement.</p>

            <ol>
                <li className='mt-[2vh]'><strong> Acceptance of Terms:</strong>- User acknowledges and agrees to abide by all terms and conditions set forth in this Agreement. User's access to Lifefinder's platform, services, or website constitutes acceptance of this Agreement.</li>
                <li className='mt-[2vh]'>
                <strong>Compliance with Laws and Regulations:</strong> - User agrees to comply with all applicable laws, regulations, and industry standards when accessing or using Lifefinder's platform, services, or website.
            </li>
            <li className='mt-[2vh]'>
                <strong>Use of Platform:</strong> - User agrees to use Lifefinder's platform, services, or website solely for lawful purposes and in accordance with Lifefinder's terms of use and guidelines.
            </li>
            <li className='mt-[2vh]'>
                <strong>User Conduct:</strong> - User agrees to conduct themselves responsibly and respectfully when interacting with Lifefinder's platform, services, or website, including refraining from engaging in any unlawful, abusive, or disruptive behavior.
            </li>
            <li className='mt-[2vh]'>
                <strong>Privacy and Data Protection:</strong> - User acknowledges and agrees to Lifefinder's Privacy Policy and consents to the collection, use, and processing of personal data as described therein.
            </li>
            <li className='mt-[2vh]'>
            <strong className='text-red-600'>Content Submission and Moderation:</strong> <strong>- User agrees to submit accurate, truthful, and non-inflammatory content</strong> when posting reviews, comments, or other user-generated content on Lifefinder's platform.
        </li>
        <li className='mt-[2vh]'>
            <strong>Ethical Conduct:</strong> - User acknowledges and agrees to abide by Lifefinder's Code of Business Conduct and Ethics, including the obligation to provide honest and accurate feedback on their experiences with medical facilities and services. <span className='text-blue-500 underline italic font-bold'>Lifefinder is a platform committed to transparency and truthfulness in the healthcare industry, striving to uphold the principles of medical ethics and the Hippocratic Oath.</span>
        </li>
        <li className='mt-[2vh]'>
            <strong>Disclaimer of Liability:</strong> - User acknowledges and agrees that Lifefinder is not liable for any damages, losses, or claims arising from User's use of Lifefinder's platform, services, or website, including but not limited to any reliance on the information provided therein. Lifefinder does not guarantee the accuracy, completeness, or reliability of any information or content on its platform and shall not be held responsible for any losses, injuries, or damages resulting from User's reliance on such information or content. Additionally, User acknowledges that Lifefinder is not a medical provider and does not provide medical diagnosis, or treatment. Users are advised to consult with qualified healthcare professionals regarding their medical needs and decisions.
        </li>
        <li className='mt-[2vh]'>
            <strong>Indemnification:</strong> - User agrees to indemnify, defend, and hold harmless Lifefinder, its officers, directors, employees, and affiliates from any claims, damages, losses, or liabilities arising out of or related to User's breach of this Agreement.
        </li>
        <li className='mt-[2vh]'>
            <strong>Termination:</strong> - Lifefinder reserves the right to terminate or suspend User's access to the platform, services, or website at any time, with or without cause or notice.
        </li>
        </ol>

        <p className='text-clr2 font-bold text-[1vw] mt-[3vh]'>
        By accessing or using Lifefinder's platform, services, or website, User acknowledges that they have read, understood, and agreed to be bound by the terms and conditions of this Agreement. 
        </p>
        </div>
                <button
                    className="text-white bg-blue-700 font-600 text-[3vw] 2lg:text-[1.4vw] py-[1.2vh] px-[3vw] mt-[5vh] rounded-[0.4vw] hover:bg-blue-900"
                    onClick={handleAccept}>
                    Accept
                </button>
            </div>
        </div>
    );
}

export default Terms;
