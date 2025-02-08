
import { BaseSchemaOutput, SchemaLabels } from "./BaseSchemaOutput";
import { FormData, ImageDimensions } from "../../App";

const labelsBR: SchemaLabels = {
  urlPlaceholder: "https://neuronup.com/br/author/neuronup/",
  imageLogoPlaceholder: "https://neuronup.com/br/wp-content/uploads/2024/10/logo-neuronup-core.svg",
  telephonePlaceholder: ["+34-649-46-40-94"],
  availableLanguage: ["pt", "es", "en", "fr"],
};

export const SchemaOutputBR: React.FC<{
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}> = (props) => (
  <BaseSchemaOutput
    {...props}
    language="pt-BR"
    labels={labelsBR}
    header="Código Schema Gerado (BR)"
  />
);
