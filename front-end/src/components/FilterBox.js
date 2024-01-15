import React, { useState } from 'react';
import './FilterBox.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { Button } from './Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography'; // Importa Typography


const propertyTypes = [
    {
      value: 'pt1',
      label: 'Casas',
    },
    {
      value: 'pt2',
      label: 'Condominios',
    },
    {
      value: 'pt3',
      label: 'Bodegas Industriales',
    },
    {
      value: 'pt4',
      label: 'Locales Comerciales',
    },
    {
        value: 'pt5',
        label: 'Fincas',
      },
      {
        value: 'pt6',
        label: 'Lotes',
      },
  ];

  const Bedrooms = [
    {
      value: 'b1',
      label: '1 cuarto',
    },
    {
      value: 'b2',
      label: '2 cuartos',
    },
    {
      value: 'b3',
      label: '3 cuartos',
    },
    {
      value: 'b4',
      label: '4 o más cuartos',
    },
   
  ];


const location = [
    {
        value: 'l1',
        label: 'San Jose',
    },
    {
        value: 'l2',
        label: 'Heredia',
    },
    {
        value: 'l3',
        label: 'Guanacaste',
    },
    {
        value: 'l4',
        label: 'Puntarenas',
    },
    {
        value: 'l5',
        label: 'Cartago',
        },
        {
        value: 'l6',
        label: 'Limón',
        },
        {
        value: 'l7',
        label: 'Alajuela',
        },
    ];

    function valuetext(value) {
        return `$${value.toLocaleString()}`;
      }

function FilterBox() {

    const [value, setValue] = React.useState([50000, 1000000]); // Ajusta los valores iniciales según tus necesidades
    const [minSize, setMinSize] = useState('');
    const [maxSize, setMaxSize] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [bedrooms, setBedrooms] = useState('');


    const handlePropertyTypeChange = (event) => {
        const selectedPropertyType = event.target.value;
        setPropertyType(selectedPropertyType);
    
        // Si es "Finca" o "Lote", deshabilitar el campo de Cuartos
        if (selectedPropertyType === 'pt5' || selectedPropertyType === 'pt6') {
          setBedrooms('');
        }
      };


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleMinSizeChange = (event) => {
        // Validar que solo se ingresen números
        const input = event.target.value.replace(/[^0-9]/g, '');
        setMinSize(input);
      };
    
      const handleMaxSizeChange = (event) => {
        // Validar que solo se ingresen números
        const input = event.target.value.replace(/[^0-9]/g, '');
        setMaxSize(input);
      };
    
      const handleKeyPress = (event) => {
        // Evitar que se ingresen caracteres no numéricos
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (!/^\d+$/.test(keyValue)) {
          event.preventDefault();
        }
      };
  return (
    <div className='filter'>
        <div>
            <div className='box-filter'>
                <div className='box-filter-row'>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                 <TextField
                id="outlined-select-PropType"
                select
                label="Tipo de Propiedad"
                value={propertyType}
                onChange={handlePropertyTypeChange}
              >
                {propertyTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
                <TextField
                id="outlined-select-Province"
                select
                label="Provincia"
                defaultValue={'l1'}
                
                >
                {location.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                {propertyType !== 'pt5' && propertyType !== 'pt6' && (
                <TextField
                  id="outlined-select-Bedrooms"
                  select
                  label="Cantidad de Cuartos"
                  value={bedrooms}
                  onChange={(event) => setBedrooms(event.target.value)}
                >
                  {Bedrooms.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                )}
                </Box>

                </div>
                <div className='box-filter-row'>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField
                    label="Max Tamaño"
                    placeholder='(Opcional)'
                    id="outlined-max-size"
                    type="text"  // Cambiado a tipo 'text'
                    sx={{ m: 1, width: '35ch' }}
                    value={maxSize}
                    onInput={handleMaxSizeChange}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">m²</InputAdornment>,
                    }}
                    />
                    <TextField
                    label="Min Tamaño"
                    placeholder='(Opcional)'
                    id="outlined-min-size"
                    type="text"  // Cambiado a tipo 'text'
                    sx={{ m: 1, width: '35ch' }}
                    value={minSize}
                    onInput={handleMinSizeChange}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">m²</InputAdornment>,
                    }}
                    />
                </Box>
                </div>
                <Typography variant="body2" gutterBottom>
              Rango de Precios: ${value[0].toLocaleString()} - ${value[1].toLocaleString()}
            </Typography>
                <div className='box-filter-row'>   
                <Box sx={{ width: 400}}>
                <Slider
                    aria-label="Precio"
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                    min={0}
                    max={2000000}  // Ajusta el valor máximo según tus necesidades
                    step={10000}    // Ajusta el paso según tus necesidades
                    sx={{
                    color: '#f67130',
                    '& .MuiSlider-rail': {
                        backgroundColor: 'lightgray',
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: '#f67130',
                    },
                    '& .MuiSlider-thumb': {
                        backgroundColor: '#f67130',
                    },
                    }}
                />
                </Box>
                </div>
                <Button buttonStyle='btn--outline'>Buscar</Button>
            </div>
        </div>
    </div>
  )
}



export default FilterBox