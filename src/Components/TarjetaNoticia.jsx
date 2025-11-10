import React from 'react'
import { Link } from 'react-router-dom'
import { Chip } from '@mui/material'

export default function TarjetaNoticia({ noticia, seccionNombre, linkPath }) {
  const n = noticia || {}
  return (
    <div className="tarjeta overflow-oculto">
      {n.imagenUrl ? (
        <img src={n.imagenUrl} alt={n.titulo} loading="lazy" className="tarjeta-cabecera-img" />
      ) : (
        <div className="tarjeta-cabecera-vacia" />
      )}
      <div className="mt-2">
        {seccionNombre && <Chip label={seccionNombre} size="small" sx={{ mb: 1 }} color="primary" />}
        {n.municipio && <Chip label={n.municipio} size="small" sx={{ mb: 1, ml: seccionNombre ? 1 : 0 }} />}
        <h3 className="mt-1 mb-2">
          <Link to={linkPath}>{n.titulo}</Link>
        </h3>
        {n.subtitulo && <p className="m-0 texto-secundario">{n.subtitulo}</p>}
        <p className="mt-2 texto-pequenio texto-secundario">
          {`Por ${n.autorNombre || 'Autor desconocido'}`}
        </p>
      </div>
    </div>
  )
}
