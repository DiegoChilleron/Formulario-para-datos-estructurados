// SchemaOutput.tsx
import React from "react";
import { FormData, ImageDimensions } from "../../App";

interface SchemaOutputProps {
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}

export const SchemaOutput: React.FC<SchemaOutputProps> = ({ formData, imageDimensions }) => {
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

  // Valores por defecto y formateo
  const articleType = type || "Article";
  const publishedDate = datePublished ? datePublished + ":00+01:00" : "### FECHA PUBLICACION ###";
  
  // Se procesan las fechas de modificación agregando el sufijo
  const modifiedDates = dateModified.length
    ? dateModified
        .filter((d) => d) // Se ignoran entradas vacías
        .map((d) => d + ":00+01:00")
    : undefined;

  const imageObject = {
    "@type": "ImageObject",
    url: urlImagen || "### URL IMAGEN ###",
    width: imageDimensions ? imageDimensions.width : 1200,
    height: imageDimensions ? imageDimensions.height : 675
  };

  const author = {
    "@type": authorType || "Organization",
    name: authorName || "NeuronUP",
    url: authorURL || "https://neuronup.com/author/inigo/",
    ...(authorRRSS && { sameAs: authorRRSS })
  };

  // Se arma el objeto schema; se incluye dateModified solo si existen fechas válidas
  const schemaObject: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": articleType,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url || "### URL ###"
        },
        headline: titulo || "### TITULO ###",
        description: descripcion || "### DESCRIPCION ###",
        datePublished: publishedDate,
        ...(modifiedDates && modifiedDates.length > 0 && { dateModified: modifiedDates }),
        articleSection: seccion || "### SECCION ###",
        inLanguage: "es",
        image: imageObject,
        author: author,
        publisher: {
          "@type": "Organization",
          name: "NeuronUP",
          logo: {
            "@type": "ImageObject",
            url: "https://neuronup.com/wp-content/uploads/2022/02/logo-neuronup-core.svg"
          }
        }
      },
      {
        "@type": "WebPage",
        url: url || "### URL ###",
        mainEntityOfPage: {
          "@type": "WebSite",
          name: "NeuronUP",
          url: "https://neuronup.com"
        },
        mainEntity: {
          "@type": "MedicalOrganization",
          name: "NeuronUP",
          url: "https://neuronup.com",
          logo: "https://neuronup.com/wp-content/uploads/2021/07/logo-neuronup-core.svg",
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
              telephone: ["+34-941-123-456", "+44-203-695-8524"],
              contactType: ["Customer Service", "Sales"],
              areaServed: "Worldwide",
              availableLanguage: ["es", "en", "fr", "pt"],
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

  // Se genera la cadena final formateada
  const schemaStringRaw = `<script type="application/ld+json">\n${JSON.stringify(schemaObject, null, 2)}\n</script>`;

  const schemaString = schemaStringRaw
  .replace(
    /("telephone": )\[\s+([^\]]+?)\s+\]/g,
    (_match, key, value) => `${key}[ ${value.replace(/\s+/g, " ")} ]`
  )
  .replace(
    /("availableLanguage": )\[\s+([^\]]+?)\s+\]/g,
    (_match, key, value) => `${key}[ ${value.replace(/\s+/g, " ")} ]`
  );

  return (
    <div className="SchemaOutput">
      <h2>Código Schema Generado</h2>
      <pre>{schemaString}</pre>
    </div>
  );
};
