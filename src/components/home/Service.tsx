import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";
import { useTranslations } from "next-intl";
import ServiceCard from "./ServiceCard";
import SlideBox from "@/utils/SlideBox";

export default function ServiceSection(){
      const t = useTranslations("Service");
    return(
        <>
            <section className="py-20 md:py-24 lg:py-28 w-full relative overflow-hidden">
                <div className="container">
                    <div className="flex justify-center items-center flex-col w-full">
                        <div className="text-center w-full xl:w-[80%] 2xl:w-[60%]">
                            <SlideHeadingLeft className="text-4xl lg:text-5xl text-primary font-regular uppercase mb-3">
                                {t("serviceHeading")}
                            </SlideHeadingLeft>
                            <SlideHeadingRight className="text-lg lg:text-xl">
                                {t("serviceSubHeading")}
                            </SlideHeadingRight>
                        </div>
                        <div className="w-full xl:w-[90%] 2xl:w-[70%]">
                            <SlideBox className="w-full">
                                <ServiceCard/>
                            </SlideBox>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}