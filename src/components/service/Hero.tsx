import Breadcrumbs from "@/utils/Breadcrumb";
import { getTranslations } from "next-intl/server";

import HeroImage from "@/assets/service/srvice-home.png"

export default async function Hero(){

      const t = await getTranslations("ServicePage");


    return(
        <>
            <Breadcrumbs
                title={t("breadcrumb")}
                eyebrow={t("eyebrow")}
                heading={t("heading")}
                description={t("subheading")}
                image={HeroImage}
                imageAlt={t("heroImageAlt")}
            />
        </>
    )
}