import React, { useState, ChangeEvent, useCallback } from "react";
import { InputForm } from "./components/Form/InputForm";
import { SchemaOutput } from "./components/SchemaOutput/SchemaOutput";

export interface FormData {
  url: string;
  type: string;
  titulo: string;
  descripcion: string;
  datePublished: string;
  dateModified: string[]; // Ahora es un array
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
    dateModified: [], // Inicialmente vacío
    seccion: "",
    urlImagen: "",
    authorType: "Organization",
    authorName: "NeuronUP",
    authorURL: "",
    authorRRSS: ""
  });

  // Estado para almacenar las dimensiones reales de la imagen
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);

  // Actualiza los campos simples del formulario
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Actualiza el array de fechas de modificación
  const handleDateModifiedChange = useCallback((newDates: string[]) => {
    setFormData((prev) => ({ ...prev, dateModified: newDates }));
  }, []);

  return (
    <div className="app">
      <h1>Generador de Schema JSON</h1>
      <div className="app__container">
        <InputForm 
          formData={formData} 
          onInputChange={handleInputChange} 
          onImageLoad={setImageDimensions}
          onDateModifiedChange={handleDateModifiedChange}
        />
        <SchemaOutput formData={formData} imageDimensions={imageDimensions} />
      </div>
    </div>
  );
};
