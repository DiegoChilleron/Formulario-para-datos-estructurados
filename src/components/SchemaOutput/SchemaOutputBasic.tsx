
import { BaseSchemaOutput, SchemaLabels } from "./BaseSchemaOutput";
import { FormData, ImageDimensions } from "../../App";

const labelsBasic: SchemaLabels = {
  urlPlaceholder: "",
  imageLogoPlaceholder: "",
  telephonePlaceholder: [""],
  availableLanguage: [""],
};

export const SchemaOutputBasic: React.FC<{
  formData: FormData;
  imageDimensions: ImageDimensions | null;
}> = (props) => (
  <BaseSchemaOutput
    {...props}
    language="es"
    labels={labelsBasic}
    header="Código Schema Generado (ES)"
  />
);
