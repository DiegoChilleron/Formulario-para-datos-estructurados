// SchemaOutput.tsx
import React from "react";
import { FormData, ImageDimensions } from "../../App";

interface SchemaOutputProps {
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}

export const SchemaOutput: React.FC<SchemaOutputProps> = ({ formData, imageDimensions }) => {
  const { url, type, titulo, descripcion, datePublished, dateModified, seccion, urlImagen, authorType, authorName, authorURL, authorRRSS } = formData;

  // Se define el schema del author según el tipo seleccionado
  const authorSchema =
    authorType === "Person"
      ? `{
                "@type": "Person",
                "name": "${authorName || "Autor Anónimo"}",
                "url": "${authorURL || "https://neuronup.com/author/author/"}"
                ${authorRRSS ? `"sameAs": "${authorRRSS}"` : ""}
              },`
      : `{
                "@type": "Organization",
                "name": "${authorName || "NeuronUP"}",
                "url": "${authorURL || "https://neuronup.com/author/inigo/"}"
              },`;


  const schema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "${type || "BlogPosting"}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url || "### URL ###"}"
      },
      "headline": "${titulo || "### TITULO ###"}",
      "description": "${descripcion || "### DESCRIPCION ###"}",
      "datePublished": "${datePublished ? datePublished + ':00+01:00' : "### FECHA PUBLICACION ###"}",
      ${dateModified ? `"dateModified": "${dateModified + ':00+01:00'}",` : ""}
      "articleSection": "${seccion || "### SECCION ###"}",
      "inLanguage": "es",
      "image": {
        "@type": "ImageObject",
        "url": "${urlImagen || "###URL IMAGEN###"}",
        "width": ${imageDimensions ? imageDimensions.width : 1200},
        "height": ${imageDimensions ? imageDimensions.height : 675}
      },
      "author": ${authorSchema}
      "publisher": {
        "@type": "Organization",
        "name": "NeuronUP",
        "logo": {
          "@type": "ImageObject",
          "url": "https://neuronup.com/wp-content/uploads/2022/02/logo-neuronup-core.svg"
        }
      }
    },
    {
      "@type": "WebPage",
      "url": "${url || "###URL###"}",
      "mainEntityOfPage": {
        "@type": "WebSite",
        "name": "NeuronUP",
        "url": "https://neuronup.com"
      },
      "mainEntity": {
        "@type": "MedicalOrganization",
        "name": "NeuronUP",
        "url": "https://neuronup.com",
        "logo": "https://neuronup.com/wp-content/uploads/2021/07/logo-neuronup-core.svg",
        "sameAs": [
          "https://www.facebook.com/NeuronUP",
          "https://x.com/NeuronUP",
          "https://www.linkedin.com/company/neuronup",
          "https://www.youtube.com/user/NeuronUp",
          "https://www.instagram.com/neuron_up"
        ],
        "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": ["+34-941-123-456", "+44-203-695-8524"],
          "contactType": ["Customer Service", "Sales"],
          "areaServed": "Worldwide",
          "availableLanguage": ["es", "en", "fr", "pt"],
          "email": "soporte@neuronup.com"
          }
        ],
          "address": {
            "@type": "PostalAddress",
              "streetAddress": "C. Piqueras, 31",
              "addressLocality": "Logroño",
              "addressRegion": "La Rioja",
              "postalCode": "26006",
              "addressCountry": "ES"
              }
          }
      }
    ]
  }
</script>
`;


  return (
    <div className="SchemaOutput">
      <h2>Código Schema Generado</h2>
      <pre>{schema}</pre>
    </div>
  );
};






