
import { BaseSchemaOutput, SchemaLabels } from "./BaseSchemaOutput";
import { FormData, ImageDimensions } from "../../App";

const labelsRU: SchemaLabels = {
  urlPlaceholder: "https://neuronup.com/ru/author/neuronup/",
  imageLogoPlaceholder: "https://neuronup.com/ru/wp-content/uploads/2025/01/logo-neuronup-core.svg",
  telephonePlaceholder: ["+34-649-46-40-94"],
  availableLanguage: ["ru", "es", "pt", "en", "fr"],
};

export const SchemaOutputRU: React.FC<{
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}> = (props) => (
  <BaseSchemaOutput
    {...props}
    language="ru"
    labels={labelsRU}
    header="Сгенерированный Schema (RU)"
  />
);
