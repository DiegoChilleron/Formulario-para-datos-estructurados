import { FormData, ImageDimensions } from "../../App";

export interface SchemaLabels {
  urlPlaceholder: string;
  imageLogoPlaceholder: string;
  telephonePlaceholder: string[];
  availableLanguage: string[];
}

export interface BaseSchemaOutputProps {
  formData: FormData;
  imageDimensions: ImageDimensions | null;
  language: string;
  labels: SchemaLabels;
  header: string;
}

export const BaseSchemaOutput: React.FC<BaseSchemaOutputProps> = ({
  formData,
  imageDimensions,
  language,
  labels,
  header
}) => {
  const {
    url,
    type,
    titulo,
    descripcion,
    datePublished,
    dateModified,
    seccion,
    urlImagen,
    authorType,
    authorName,
    authorURL,
    authorRRSS
  } = formData;

  const articleType = type || "Article";
  const publishedDate = datePublished
    ? `${datePublished}:00+01:00`
    : "";

  const modifiedDates =
    dateModified.length > 0
      ? dateModified.filter(d => d).map(d => `${d}:00+01:00`)
      : undefined;

  const imageObject = {
    "@type": "ImageObject",
    url: urlImagen || "",
    width: imageDimensions ? imageDimensions.width : 1200,
    height: imageDimensions ? imageDimensions.height : 675
  };


  const filteredRRSS = authorRRSS.filter(a => a);
  const sameAs =
    filteredRRSS.length > 0
      ? filteredRRSS.length === 1
        ? filteredRRSS[0]
        : filteredRRSS
      : undefined;

  const author = {
    "@type": authorType || "Organization",
    name: authorName || "NeuronUP",
    url: authorURL || "https://neuronup.com/author/inigo/",
    ...(sameAs && { sameAs })
  };

  const schemaObject: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": articleType,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url || labels.urlPlaceholder
        },
        headline: titulo || "",
        description: descripcion || "",
        datePublished: publishedDate,
        ...(modifiedDates &&
          modifiedDates.length > 0 && { dateModified: modifiedDates }),
        articleSection: seccion || "",
        inLanguage: language,
        image: imageObject,
        author: author,
        publisher: {
          "@type": "Organization",
          name: "NeuronUP",
          logo: {
            "@type": "ImageObject",
            url: labels.imageLogoPlaceholder,
          }
        }
      },
      {
        "@type": "WebPage",
        url: url || labels.urlPlaceholder,
        mainEntityOfPage: {
          "@type": "WebSite",
          name: "NeuronUP",
          url: "https://neuronup.com"
        },
        mainEntity: {
          "@type": "MedicalOrganization",
          name: "NeuronUP",
          url: "https://neuronup.com",
          logo: labels.imageLogoPlaceholder,
          sameAs: [
            "https://www.facebook.com/NeuronUP",
            "https://x.com/NeuronUP",
            "https://www.linkedin.com/company/neuronup",
            "https://www.youtube.com/user/NeuronUp",
            "https://www.instagram.com/neuron_up"
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: labels.telephonePlaceholder,
              contactType: [ "Customer Service", "Sales"],
              areaServed: "Worldwide",
              availableLanguage: labels.availableLanguage,
              email: "soporte@neuronup.com"
            }
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "C. Piqueras, 31",
            addressLocality: "Logroño",
            addressRegion: "La Rioja",
            postalCode: "26006",
            addressCountry: "ES"
          }
        }
      }
    ]
  };

  const schemaStringRaw = `<script type="application/ld+json">\n${JSON.stringify(
    schemaObject,
    null,
    2
  )}\n</script>`;
  const schemaString = schemaStringRaw
    .replace(
      /("telephone": )\[\s+([^\]]+?)\s+\]/g,
      (_match, key, value) =>
        `${key}[ ${value.replace(/\s+/g, " ")} ]`
    )
    .replace(
      /("availableLanguage": )\[\s+([^\]]+?)\s+\]/g,
      (_match, key, value) =>
        `${key}[ ${value.replace(/\s+/g, " ")} ]`
    );

  return (
    <div className="SchemaOutput">
      <h2>{header}</h2>
      <pre>{schemaString}</pre>
    </div>
  );
};
