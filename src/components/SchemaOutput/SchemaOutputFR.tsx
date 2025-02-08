
import { BaseSchemaOutput, SchemaLabels } from "./BaseSchemaOutput";
import { FormData, ImageDimensions } from "../../App";

const labelsFR: SchemaLabels = {
  urlPlaceholder: "https://neuronup.com/fr/author/neuronup/",
  imageLogoPlaceholder: "https://neuronup.com/fr/wp-content/uploads/2024/10/logo-neuronup-core.svg",
  telephonePlaceholder: ["+33-745-893-378"],
  availableLanguage: ["fr", "es", "en", "pt"],
};

export const SchemaOutputFR: React.FC<{
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}> = (props) => (
  <BaseSchemaOutput
    {...props}
    language="fr"
    labels={labelsFR}
    header="Code Schema Généré (FR)"
  />
);
