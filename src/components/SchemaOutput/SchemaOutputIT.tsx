
import { BaseSchemaOutput, SchemaLabels } from "./BaseSchemaOutput";
import { FormData, ImageDimensions } from "../../App";

const labelsIT: SchemaLabels = {
  urlPlaceholder: "https://neuronup.com/it/author/neuronup/",
  imageLogoPlaceholder: "https://neuronup.com/it/wp-content/uploads/2023/12/logo-neuronup-core.svg",
  telephonePlaceholder: ["+34-649-46-40-94", "+39-351-408-51-10"],
  availableLanguage: ["it", "pt", "es", "en", "fr"],
};

export const SchemaOutputIT: React.FC<{
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}> = (props) => (
  <BaseSchemaOutput
    {...props}
    language="it"
    labels={labelsIT}
    header="Codice Schema Generato (IT)"
  />
);
