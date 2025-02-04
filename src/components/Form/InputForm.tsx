// InputForm.tsx
import { ChangeEvent } from "react";
import { FormData } from "../../App";

interface InputFormProps {
  formData: FormData;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  // Se pasará null si no se pudo obtener la imagen o las dimensiones reales
  onImageLoad: (dimensions: { width: number; height: number } | null) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ formData, onInputChange, onImageLoad }) => {

  const handleImageBlur = () => {
    if (!formData.urlImagen) {
      onImageLoad(null);
      return;
    }

    const img = new Image();
    img.src = formData.urlImagen;
    img.onload = () => {
      // Al cargar la imagen se actualizan las dimensiones reales
      onImageLoad({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      // Si no se puede cargar la imagen, se establece null
      onImageLoad(null);
    };
  };

  return (
    <form>
      <div className="inputForm__div">
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={onInputChange}
          placeholder="Ingrese la URL de la página"
        />
      </div>

      <div className="inputForm__div">
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={onInputChange}
        >
          <option value="Article">Article</option>
          <option value="NewsArticle">NewsArticle</option>
          <option value="BlogPosting">BlogPosting</option>
        </select>
      </div>

      <div className="inputForm__div">
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={onInputChange}
          placeholder="Ingrese el título"
        />
      </div>

      <div className="inputForm__div">
        <label htmlFor="descripcion">Descripción:</label>
        <input
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={onInputChange}
          placeholder="Ingrese la descripción"
        ></input>
      </div>

      <div className="inputForm__div">
        <label htmlFor="datePublished">Fecha de publicación:</label>
        <input
          type ="datetime-local"
          id="datePublished"
          name="datePublished"
          value={formData.datePublished}
          onChange={onInputChange}
          placeholder="Ingrese la fecha de publicación"
        ></input>
      </div>

      <div className="inputForm__div">
        <label htmlFor="dateModified">Fecha de modificación:</label>
        <input
          type ="datetime-local"
          id="dateModified"
          name="dateModified"
          value={formData.dateModified}
          onChange={onInputChange}
          placeholder="Ingrese la fecha de modificacióm"
        ></input>
      </div>

      <div className="inputForm__div">
        <label htmlFor="seccion">Sección:</label>
        <input
          type="text"
          id="seccion"
          name="seccion"
          value={formData.seccion}
          onChange={onInputChange}
          placeholder="Ingrese la sección"
        />
      </div>

      <div className="inputForm__div">
        <label htmlFor="urlImagen">URL Imagen de portada:</label>
        <input
          type="text"
          id="urlImagen"
          name="urlImagen"
          value={formData.urlImagen}
          onChange={onInputChange}
          onBlur={handleImageBlur}
          placeholder="Ingrese la URL de la imagen"
        />
      </div>

      <div className="inputFormdiv__author">
        <div className="inputForm__div">
          <label htmlFor="authorType">Tipo de Autor:</label>
          <select
            id="authorType"
            name="authorType"
            value={formData.authorType}
            onChange={onInputChange}
          >
            <option value="Organization">Organization</option>
            <option value="Person">Person</option>
          </select>
        </div>

        <div className="inputForm__div">
          <label htmlFor="authorName">Nombre del Autor:</label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={onInputChange}
            placeholder="Ingrese el nombre del autor"
          />
        </div>

        <div className="inputForm__div">
          <label htmlFor="authorURL">URL del autor:</label>
          <input
            type="text"
            id="authorURL"
            name="authorURL"
            value={formData.authorURL}
            onChange={onInputChange}
            placeholder="Ingrese la URL del autor"
          />
        </div>

        <div className="inputForm__div">
          <label htmlFor="authorRRSS">RRSS del autor:</label>
          <input
            type="text"
            id="authorRRSS"
            name="authorRRSS"
            value={formData.authorRRSS}
            onChange={onInputChange}
            placeholder="Ingrese el perfil de redes sociales del autor"
          />
        </div>
      </div>
    </form>
  );
};


