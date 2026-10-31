import { getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import {
  CredentialImageText,
  CredentialTextImage,
} from "@/components/credential/CredentialFeature";
import cityImage from "@/assets/home/blog1.png";
import FadeUp from "@/utils/FadeUp";

import cerficate1 from "@/assets/credentials/cer1.png";
import cerficate2 from "@/assets/credentials/cer2.png";
import cerficate3 from "@/assets/credentials/cer3.png";
import cerficate4 from "@/assets/credentials/cer4.png";
import cerficate5 from "@/assets/credentials/cer5.png";
import cerficate6 from "@/assets/credentials/cer6.png";
import cerficate7 from "@/assets/credentials/cer7.png";

import iso1215 from "@/assets/credentials/14001_2015_gtIjTVdHc.webp"
import iso9015 from "@/assets/credentials/9001___2015_p21NaZipC.webp"
import iso4118 from "@/assets/credentials/41001_2018_j50fwqS3U.webp"
import iso4518 from "@/assets/credentials/45001_2018_v0PRCylAx.webp"
import bics from "@/assets/credentials/BICSc1.png"
import ministry from "@/assets/credentials/ministry1.webp"
import author from "@/assets/credentials/authority.webp"

export default async function CredentialPage() {
  const t = await getTranslations("Credential");

  return (
    <main className="min-h-screen bg-background pb-12">
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        description={t("subheading")}
        image={cityImage}
        imageAlt={t("heroImageAlt")}
      />

      <div id="certificates">
        <div className="container pt-10 text-center sm:pt-14">
          <FadeUp className="text-xs font-bold uppercase text-secondary">
            {t("sectionEyebrow")}
          </FadeUp>
          <FadeUp>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("sectionHeading")}
            </h2>
          </FadeUp>
        </div>
        <CredentialTextImage
          eyebrow={t("environment.eyebrow")}
          title={t("environment.title")}
          subtitle={t("environment.subtitle")}
          description={t("environment.description")}
          image={iso1215}
          imageLink={cerficate1}
          imageAlt={t("environment.imageAlt")}
          viewCertificateLabel={t("viewCertificate")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialImageText
          eyebrow={t("quality.eyebrow")}
          title={t("quality.title")}
          subtitle={t("quality.subtitle")}
          description={t("quality.description")}
          image={iso9015}
          imageLink={cerficate2}
          imageAlt={t("quality.imageAlt")}
          viewCertificateLabel={t("viewCertificate")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialTextImage
          eyebrow={t("facility.eyebrow")}
          title={t("facility.title")}
          subtitle={t("facility.subtitle")}
          description={t("facility.description")}
          image={iso4118}
          imageLink={cerficate3}
          imageAlt={t("facility.imageAlt")}
          viewCertificateLabel={t("viewCertificate")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialImageText
          eyebrow={t("occupational.eyebrow")}
          title={t("occupational.title")}
          subtitle={t("occupational.subtitle")}
          description={t("occupational.description")}
          image={iso4518}
          imageLink={cerficate4}
          imageAlt={t("occupational.imageAlt")}
          viewCertificateLabel={t("viewCertificate")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialTextImage
          eyebrow={t("membership.eyebrow")}
          title={t("membership.title")}
          subtitle={t("membership.subtitle")}
          description={t("membership.description")}
          image={bics}
          imageLink={cerficate5}
          imageAlt={t("membership.imageAlt")}
          viewCertificateLabel={t("viewCertificate")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
      </div>
      <div id="vendor">
        <div className="container pt-10 text-center sm:pt-14">
          <FadeUp className="text-xs font-bold uppercase text-secondary">
            {t("sectionEyebrow")}
          </FadeUp>
          <FadeUp>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("sectionHeading2")}
            </h2>
          </FadeUp>
        </div>
        <div className=" container mt-5">
          {/* <div className="p-5 bg-gray-100 text-center">
              {t("venderEmptyText")}
          </div> */}
          <CredentialImageText
          eyebrow={t("occupational.eyebrow")}
          title={t("occupational.title")}
          subtitle={t("occupational.subtitle")}
          description={t("occupational.description")}
          image={iso4518}
          imageLink={cerficate4}
          imageAlt={t("occupational.imageAlt")}
          viewCertificateLabel={t("viewCertificate")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        </div>
      </div>
      <div id="compliance">
        <div className="container pt-10 text-center sm:pt-14">
          <FadeUp className="text-xs font-bold uppercase text-secondary">
            {t("sectionEyebrow")}
          </FadeUp>
          <FadeUp>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {t("sectionHeading1")}
            </h2>
          </FadeUp>
        </div>
        <CredentialTextImage
          eyebrow={t("ministry.eyebrow")}
          title={t("ministry.title")}
          subtitle={t("ministry.subtitle")}
          description={t("ministry.description")}
          image={ministry}
          imageLink={cerficate6}
          imageAlt={t("ministry.imageAlt")}
          viewCertificateLabel={t("viewCertificate")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
        <CredentialImageText
          eyebrow={t("authority.eyebrow")}
          title={t("authority.title")}
          subtitle={t("authority.subtitle")}
          description={t("authority.description")}
          image={cerficate7}
          imageLink={cerficate7}
          imageAlt={t("authority.imageAlt")}
          viewCertificateLabel={t("viewCertificate")}
          viewImageLabel={t("viewImage")}
          lensLabel={t("viewLens")}
          closeImageLabel={t("closeImage")}
          openLinkLabel={t("openLink")}
        />
      </div>
    </main>
  );
}
