import { useState, ChangeEvent, useCallback } from "react";
import { InputForm } from "./components/Form/InputForm";
import { SchemaOutputBasic } from "./components/SchemaOutput/SchemaOutputBasic";
import { SchemaOutputEN } from "./components/SchemaOutput/SchemaOutputEN";
import { SchemaOutputES } from "./components/SchemaOutput/SchemaOutputES";
import { SchemaOutputBR } from "./components/SchemaOutput/SchemaOutputBR";
import { SchemaOutputFR } from "./components/SchemaOutput/SchemaOutputFR";
import { SchemaOutputIT } from "./components/SchemaOutput/SchemaOutputIT";
import { SchemaOutputRU } from "./components/SchemaOutput/SchemaOutputRU";
import { SchemaOutputAR } from "./components/SchemaOutput/SchemaOutputAR";

export interface FormData {
  url: string;
  type: string;
  titulo: string;
  descripcion: string;
  datePublished: string;
  dateModified: string[];
  seccion: string;
  urlImagen: string;
  authorType: "Organization" | "Person";
  authorName: string;
  authorURL: string;
  authorRRSS: string[];
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    url: "",
    type: "",
    titulo: "",
    descripcion: "",
    datePublished: "",
    dateModified: [],
    seccion: "",
    urlImagen: "",
    authorType: "Organization",
    authorName: "NeuronUP",
    authorURL: "",
    authorRRSS: []
  });

  // Estado para almacenar las dimensiones reales de la imagen
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(
    null
  );

  // Actualiza los campos simples del formulario
  const handleInputChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Actualiza el array de fechas de modificación
  const handleDateModifiedChange = useCallback((newDates: string[]) => {
    setFormData((prev) => ({ ...prev, dateModified: newDates }));
  }, []);

  // Actualiza el array de redes sociales del autor
  const handleAuthorRRSSChange = useCallback((newRRSS: string[]) => {
    setFormData((prev) => ({ ...prev, authorRRSS: newRRSS }));
  }, []);

  // Selecciona el componente SchemaOutput en función de la URL introducida
  let SchemaOutputComponent: React.FC<{
    formData: FormData;
    imageDimensions: ImageDimensions | null;
  }>;

  if (formData.url.startsWith("https://neuronup.us")) {
    SchemaOutputComponent = SchemaOutputEN;
  } else if (formData.url.startsWith("https://neuronup.com/br")) {
    SchemaOutputComponent = SchemaOutputBR;
  } else if (formData.url.startsWith("https://neuronup.com/fr")) {
    SchemaOutputComponent = SchemaOutputFR;
  } else if (formData.url.startsWith("https://neuronup.com/it")) {
    SchemaOutputComponent = SchemaOutputIT;
  } else if (formData.url.startsWith("https://neuronup.com/ru")) {
    SchemaOutputComponent = SchemaOutputRU;
  } else if (formData.url.startsWith("https://neuronup.com/ar")) {
    SchemaOutputComponent = SchemaOutputAR;
  } else if (formData.url.startsWith("https://neuronup.com")) {
    SchemaOutputComponent = SchemaOutputES;
  } else {
    SchemaOutputComponent = SchemaOutputBasic;
  }

  return (
    <div className="app">
      <h1>Generador de Schema JSON</h1>
      <div className="app__container">
        <InputForm
          formData={formData}
          onInputChange={handleInputChange}
          onImageLoad={setImageDimensions}
          onDateModifiedChange={handleDateModifiedChange}
          onAuthorRRSSChange={handleAuthorRRSSChange}
        />
        <SchemaOutputComponent
          formData={formData}
          imageDimensions={imageDimensions}
        />
      </div>
    </div>
  );
};
