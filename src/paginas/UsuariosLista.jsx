import React, { useEffect, useState } from 'react'
import { listarDocumentos, actualizarDocumento } from '../servicios/firebase'
import { useUsuario } from '../contexto/UsuarioContexto'
import { ROLES } from '../servicios/modelos'

const LISTA_ROLES = Object.values(ROLES)

export default function UsuariosLista() {
  const { rol } = useUsuario()
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  async function cargar() {
    setError(null)
    try {
      const lista = await listarDocumentos('usuarios')
      setUsuarios(lista)
    } catch (e) {
      setError('No se pudo cargar usuarios')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  async function cambiarRol(u, nuevoRol) {
    try {
      await actualizarDocumento('usuarios', u.id || u.uid, { rol: nuevoRol })
      setUsuarios((prev) => prev.map((x) => (x.id === (u.id || u.uid) ? { ...x, rol: nuevoRol } : x)))
    } catch (e) {
      alert('No se pudo actualizar el rol')
    }
  }

  if (cargando) return <p>Cargando usuarios...</p>

  return (
    <div>
      <header className="mb-3">
        <h1 className="mt-0">Usuarios</h1>
        <p className="m-0 texto-secundario">Gestiona roles y permisos.</p>
      </header>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <div className="grid-tarjetas">
        {usuarios.map((u) => (
          <div key={u.id || u.uid} className="tarjeta">
            <h3 className="mt-0">{u.nombre || u.correo || u.uid}</h3>
            <p className="m-0 texto-secundario">{u.correo}</p>
            <div className="mt-2">
              <p className="m-0 texto-pequenio texto-secundario">Rol</p>
              <select
                value={u.rol || ROLES.reportero}
                onChange={(e) => cambiarRol(u, e.target.value)}
                disabled={rol !== ROLES.administrador}
                className="select-simple w-100"
              >
                {LISTA_ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

