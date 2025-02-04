// App.tsx
import React, { useState, ChangeEvent } from "react";
import { InputForm } from "./components/Form/InputForm";
import { SchemaOutput } from "./components/SchemaOutput/SchemaOutput";

export interface FormData {
  url: string;
  type: string;
  titulo: string;
  descripcion: string;
  datePublished: string;
  dateModified: string;
  seccion: string;
  urlImagen: string;
  authorType: "Organization" | "Person";
  authorName: string;
  authorURL: string;
  authorRRSS: string;
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
    dateModified: "",
    seccion: "",
    urlImagen: "",
    authorType: "Organization",
    authorName: "NeuronUP",
    authorURL: "",
    authorRRSS: ""
  });

  // Estado para almacenar las dimensiones reales de la imagen (o null si no se han obtenido)
 const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);

  // Actualiza el estado del formulario cuando se modifica un input
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="app">
      <h1>Generador de Schema JSON</h1>
      <div className="app__container">
        {/* Se pasa la función onInputChange y la función para actualizar dimensiones */}
        <InputForm 
          formData={formData} 
          onInputChange={handleInputChange} 
          onImageLoad={setImageDimensions}
        />
        <SchemaOutput formData={formData} imageDimensions={imageDimensions} />
      </div>
    </div>
  );
};

