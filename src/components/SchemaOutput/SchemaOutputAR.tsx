
import { BaseSchemaOutput, SchemaLabels } from "./BaseSchemaOutput";
import { FormData, ImageDimensions } from "../../App";

const labelsAR: SchemaLabels = {
  urlPlaceholder: "https://neuronup.com/ar/author/neuronup/",
  imageLogoPlaceholder: "https://neuronup.com/ar/wp-content/uploads/2024/10/logo-neuronup-core.svg",
  telephonePlaceholder: ["+34-941-123-456", "+44-203-695-8524"],
  availableLanguage: ["ar", "es", "pt", "en", "fr"],
};

export const SchemaOutputAR: React.FC<{
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}> = (props) => (
  <BaseSchemaOutput
    {...props}
    language="es"
    labels={labelsAR}
    header="Código Schema Generado (ES)"
  />
);
