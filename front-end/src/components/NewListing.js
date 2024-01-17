import React, { useState } from 'react';
import axios from 'axios';
import './NewListing.css';
import SuccessModal from './SuccessModal';
import { addProperty } from '../api/property';

function NewListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [financingOptions, setFinancingOptions] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [province, setProvince] = useState('');
  const [canton, setCanton] = useState('');
  const [distrito, setDistrito] = useState('');
  const [direccion, setDireccion] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});
  
    return cookies.token || null;
  };

  const handleCheckboxChange = (option) => {
    if (financingOptions.includes(option)) {
      setFinancingOptions(financingOptions.filter((item) => item !== option));
    } else {
      setFinancingOptions([...financingOptions, option]);
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImageFiles([...imageFiles, ...files]);
  };

  const handleAddProperty = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await axios.post('http://localhost:9000/upload', formData);
      const imageUrls = response.data;// Ajustamos para obtener las URLs

      const token = getTokenFromCookie();
      if (!token) {
        console.error('No se pudo encontrar el token en las cookies.');
        return;
      }
      const propertyData = {
        title: title,
        description: description,
        price: price,
        paymentMethod: selectedOption,
        financingOptions: financingOptions,
        province: province,
        canton: canton,
        distrito: distrito,
        images: imageUrls, 
        direccion: direccion,
        ownerID: token,
      };

      const res = await addProperty(propertyData);
      console.log(res);

      setTitle('');
      setDescription('');
      setPrice('');
      setSelectedOption('');
      setFinancingOptions([]);
      setImageFiles([]);
      setProvince('');
      setCanton('');
      setDistrito('');
      setDireccion('');

      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error al agregar la propiedad:', error);
    }
  };

  return (
    <div className='main-container'>
      <form className='form-container' onSubmit={handleAddProperty}>
        <div className='design-container'>
          <h1>Descripción de la propiedad</h1>

          <div className='form-group'>
            <label>Titulo de la propiedad</label>
            <input type='text' 
            value = {title} onChange = {(e) => setTitle(e.target.value)}
            required/>
          </div>

          <div className='form-group'>
          <label>Descripción adicional</label>
          <textarea
            rows='4'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

          <div className='form-group'>
            <p>Precio de la propiedad</p>
            <label>Precio</label>
            <input type='text' 
            value={price} onChange = {(e) => setPrice(e.target.value)}
            required />
          </div>

          <div className='form-group'>
            <label htmlFor='options'>Posibles métodos de pago:</label>
            <select id='options' value={selectedOption} onChange={handleSelectChange} required>
              <option value=''>Selecciona...</option>
              <option value='carro'>Carro</option>
              <option value='propiedad'>Propiedad</option>
              <option value='moto'>Moto</option>
              <option value='otro'>Otro</option>
            </select>

            {selectedOption && (
              <p>Tu selección es: {selectedOption}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Opciones de financiamiento:</label>
            <div className='checkbox-group'>
              <input
                type='checkbox'
                value='contado'
                checked={financingOptions.includes('contado')}
                onChange={() => handleCheckboxChange('contado')} 
              />
              <label>Contado</label>

              <input
                type='checkbox'
                value='financiamiento'
                checked={financingOptions.includes('financiamiento')}
                onChange={() => handleCheckboxChange('financiamiento')} 
              />
              <label>Financiamiento</label>
              {/* Agrega más opciones según sea necesario */}
            </div>
          </div>
          <div className='form-group'>
            <label>Otro:</label>
            <input type='text' />
          </div>
          
        </div>

        <div className='media-container'>
          <h1>Fotos de la propiedad</h1>
          <input type='file' multiple onChange={handleImageChange} />          
          <div className='image-preview-container'>
          {Array.isArray(imageFiles) && imageFiles.map((file, index) => (
            <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Imagen ${index + 1}`}
                className='image-preview'
            />
            ))}
          </div>
        </div>

        <div className='location-container'>
        <h1>Ubicación de la propiedad</h1>

        <div className='form-group'>
            <label>Provincia</label>
            <input type='text' value={province} onChange={(e) => setProvince(e.target.value)} required />
        </div>

        <div className='form-group'>
            <label>Cantón</label>
            <input type='text' value={canton} onChange={(e) => setCanton(e.target.value)} required />
        </div>

        <div className='form-group'>
            <label>Distrito</label>
            <input type='text' value={distrito} onChange={(e) => setDistrito(e.target.value)} required />
        </div>
        <div className='form-group'>
        <label>Dirección extra opcional</label>
        <textarea
          rows='4'
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        ></textarea>
      </div>
        </div>
        <div className='form-group'>
            <button type='submit'>
                Agregar Propiedad
            </button>
            </div>
            {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
      </form>
      
    </div>
  );
}

export default NewListing;
