import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { FaChevronDown } from "react-icons/fa";

const { Panel } = Collapse;

const surrogacyData = [
  {
    title: "Track Record",
    content:
      "Intended parents should consider various factors when evaluating surrogacy jurisdictions. These include the duration of surrogacy's legality for international intended parents in a given country, the prevalence of surrogacy for international intended parents, societal and political acceptance of surrogacy, and the longevity and reputation of surrogacy service providers.",
  },
  {
    title: "Legal Framework",
    content:
      "Intended parents should understand the legal landscape of surrogacy in a potential jurisdiction. This includes clarity on the legality of surrogacy for international intended parents, protection of parental rights, enforceability of surrogacy contracts, and the nationality of the baby upon birth and its implications for immigration and citizenship.",
  },
  {
    title: "Surrogate Recruitment and Screening",
    content:
      "Given the crucial role of the surrogate, intended parents must assess how surrogates are recruited and screened. This involves examining medical criteria such as overall health, pregnancy history, and psychological and financial stability, as well as evaluating the support network and motivation of potential surrogates.",
  },
  {
    title: "Quality of IVF Treatments and Medical Care",
    content:
      "The quality of IVF treatments and medical care is pivotal to a successful surrogacy journey. Intended parents should research success rates and procedures performed by IVF clinics, the level of medical care provided to surrogates during and after pregnancy, and the availability of neonatal intensive care for the baby if needed.",
  },
];

const SurrogacyCollapse = () => {
  return (
    <div className="flex flex-col items-center p-[2vh] md:p-[5vh] gap-y-[40px]">
      <h1 className="text-[5vw] md:text-[3vw] font-bold text-center text-clr3 plastic-heading">
        How to Evaluate Possible Surrogacy Jurisdictions?
      </h1>
      <div className="flex w-full gap-[2.5rem] md:gap-[1rem] lg:gap-[1.5rem] flex-col items-center">
        <div className="image w-full xs:w-[90%] sm:w-[70%] md:w-[55%] lg:w-[50%] xl:w-[40%] h-[50vh] sm:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
          <img className="h-full w-full object-cover rounded-[2rem]" src="/assests/surogacy.jpg" alt="" />
        </div>
        <div className="w-full md:w-[95%] mt-[3rem]">
          <Collapse
            accordion
            expandIconPosition="right"
            className="custom-collapse"
            expandIcon={() => null}
          >
            {surrogacyData.map((data, index) => (
              <Panel
                header={
                  <div className="panel-header flex justify-between w-full items-center">
                    <span className="font-bold text-[1.1rem] xs:text-xl text-clr1">
                      {data.title}
                    </span>
                    <FaChevronDown className="icon" />
                  </div>
                }
                key={index}
              >
                <p className="text-lg font-semibold text-clr2">{data.content}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default SurrogacyCollapse;
