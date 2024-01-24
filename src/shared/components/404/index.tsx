import { Link } from 'react-router-dom';
import { Typography } from '../typography';
import Image404 from './../../../assets/404-2.png';
import './index.styles.css';

export const NotFound404 = () => {
  return (
    <div className='not-found-404'>
      <img src={Image404} alt='SoymichelDev Board 404 image' />

      <Typography component='h1'>
        Oooops! Sentimos el error 😵
      </Typography>

      <Typography className='message' component='h4'>
        <>
          El sitio al que intentas acceder al parecer no existe. Haz click en el siguiente botón para <Link to='/'>volver al inicio</Link>.
        </>
      </Typography>
    </div>
  );
};
