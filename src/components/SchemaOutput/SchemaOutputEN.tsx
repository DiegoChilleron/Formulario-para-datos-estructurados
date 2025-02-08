
import { BaseSchemaOutput, SchemaLabels } from "./BaseSchemaOutput";
import { FormData, ImageDimensions } from "../../App";

const labelsEN: SchemaLabels = {
  urlPlaceholder: "https://neuronup.us/author/neuronup/",
  imageLogoPlaceholder: "https://neuronup.us/wp-content/uploads/2023/09/logo-neuronup-core.svg",
  telephonePlaceholder: ["+1-929-579-1273", "+44-203-695-8524"],
  availableLanguage: ["es", "en", "fr", "pt"],
};

export const SchemaOutputEN: React.FC<{
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}> = (props) => (
  <BaseSchemaOutput
    {...props}
    language="es"
    labels={labelsEN}
    header="Código Schema Generado (ES)"
  />
);
