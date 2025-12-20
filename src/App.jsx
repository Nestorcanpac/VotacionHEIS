import { useState, useEffect, useMemo } from 'react'
import supabase from './utils/supabase'
import './App.css'

// Función para normalizar texto (quitar acentos y convertir a minúsculas)
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// Pantalla de presentación
function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="logo-container">
          <div className="heis-logo">
            <span className="heis-text">HEIS</span>
            <div className="logo-circle">
              <div className="logo-circle-inner"></div>
            </div>
          </div>
          <span className="global-text">global</span>
          <div className="tagline">PACKAGING HEALTHCARE</div>
        </div>
        <div className="welcome-text">
          <h1 className="welcome-title">Votaciones para los premios</h1>
          <h2 className="welcome-subtitle">HEIS Global</h2>
        </div>
        <button className="start-button" onClick={onStart}>
          Empezar
        </button>
      </div>
    </div>
  )
}

// Lista de participantes (hardcodeada)
const PARTICIPANTES_NOMBRES = [
  'Alejandro Leal Navarro',
  'María Ferrández garcia',
  'Yolanda Cañete Conteiro.',
  'Beatriz Giménez Ganga',
  'Kamal yadav',
  'Adriana Mancilla',
  'José Manuel Padilla Perez',
  'Pablo Guill García',
  'Antonio López Sánchez',
  'Yesica Yuste',
  'Carlos Mario zapata grajales',
  'Álvaro Palmer Navarro',
  'Fernanda López Sánchez',
  'Adrian Calete',
  'Jose miguel mas quiñones',
  'Adrian Ruiz Navarro',
  'Carmen Ortuño',
  'Irene saura navedo',
  'Maria Moltó Escoda',
  'Aniceto Francés',
  'Nuria Candela Martínez',
  'Carlos Enrique Mendoza García',
  'Lara Domínguez García - Salmones',
  'Karen mendoza herrera',
  'CARLOS RIBERA',
  'Miguel Ángel Monllor Martinez',
  'Daniel Albert Seda',
  'Leonardo Fernandez',
  'Alexandra Briones',
  'Ana Vázquez Rodríguez',
  'Mario Salazar',
  'Néstor Cantarero Pacheco',
  'Gonzalo Gisbert',
  'ANTONIO JOSÉ FRANCÉS',
  'Jose Ángel Fiallegas Ferri',
  'Virtu Ferrero',
  'Diego Quillupangui',
  'Javier Carreño Fernández',
  'CRISTINA SIMÓ RICHART',
  'Daniel Chacón Domínguez',
  'Brian Aranda',
  'Silvia camus mounede',
  'Laura Albero',
  'Gregory jose perez marquez',
  'Eddy Quillupangui',
  'María José Hernández Martínez',
  'Antonio García Bañón',
  'Naila Juliett Basto Angulo',
  'Rafael Párraga Marín',
  'Olga Sánchez Abad',
  'Manuel Estevan Motos',
  'Andrea Jejen',
  'Martín Emilio Posada Escobar',
  'Javier Crespo Sempere',
  'Marco antonio coloma leon',
  'Pablo Amorós',
  'Daniel Mora Ibáñez',
  'Tatiana canto mas',
  'Loraine Estefany Durán Gaviria',
  'Víctor Andrés Cáceres Ribero',
  'Víctor Cáceres Sánchez',
  'Vicente Perez Javier',
  'Pablo Antonio Perez Serrano'
]

// Configuración de premios
const PREMIOS = [
  {
    letra: 'H',
    nombre: 'Premio H',
    descripcion: 'Humilde y honrado: esa persona que está dispuesta a aprender y trabajar sin creerse superior.'
  },
  {
    letra: 'E',
    nombre: 'Premio E',
    descripcion: 'Enérgico. Esa persona que trabaja con impulso, iniciativa y mucha vitalidad.'
  },
  {
    letra: 'I',
    nombre: 'Premio I',
    descripcion: 'Implicado: comprometido con su trabajo y dispuesto. Da lo mejor en cada tarea.'
  },
  {
    letra: 'S',
    nombre: 'Premio S',
    descripcion: 'Solidario: ayuda a los demás y colabora para que el equipo salga adelante.'
  }
]

// Pantalla de selección de participante
function SeleccionarParticipanteScreen({ personas, onSelect, loading }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPersonas, setFilteredPersonas] = useState(personas)
  const [selectedParticipante, setSelectedParticipante] = useState(null)
  const [showList, setShowList] = useState(true)

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPersonas(personas)
      return
    }

    const normalizedSearch = normalizeText(searchTerm)
    const filtered = personas.filter(persona =>
      normalizeText(persona.nombre).includes(normalizedSearch)
    )
    setFilteredPersonas(filtered)
  }, [searchTerm, personas])

  const handleSelect = (persona) => {
    setSelectedParticipante(persona)
    setShowList(false) // Ocultar la lista al seleccionar
  }

  const handleChangeSelection = () => {
    setShowList(true) // Mostrar la lista de nuevo
    setSelectedParticipante(null) // Limpiar selección
    setSearchTerm('') // Limpiar búsqueda
  }

  const handleContinue = () => {
    if (selectedParticipante) {
      onSelect(selectedParticipante)
    }
  }

  return (
    <div className="seleccionar-participante-screen">
      <div className="seleccionar-participante-content">
        <div className="seleccionar-participante-header">
          <h1 className="seleccionar-participante-title">Selecciona tu nombre</h1>
          <p className="seleccionar-participante-subtitle">
            Por favor, selecciona tu nombre de la lista para comenzar a votar
          </p>
        </div>

        {showList && (
          <>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder={loading ? "Cargando..." : "Buscar persona..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Cargando participantes...</p>
              </div>
            ) : (
              <div className="personas-list">
                {filteredPersonas.length === 0 ? (
                  <p className="no-results">No se encontraron resultados</p>
                ) : (
                  filteredPersonas.map((persona) => (
                    <div
                      key={persona.id}
                      className={`persona-item ${selectedParticipante?.id === persona.id ? 'selected' : ''}`}
                      onClick={() => handleSelect(persona)}
                    >
                      {persona.nombre}
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {selectedParticipante && (
          <div className="selected-person">
            <p>Seleccionado: <strong>{selectedParticipante.nombre}</strong></p>
            {!showList && (
              <button
                className="change-selection-button"
                onClick={handleChangeSelection}
              >
                Cambiar selección
              </button>
            )}
          </div>
        )}

        <button
          className="next-button"
          onClick={handleContinue}
          disabled={!selectedParticipante}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

// Pantalla de votación para un premio
function PremioScreen({ premio, personas, participanteActual, onSelect, selectedPerson, onNext }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showList, setShowList] = useState(true)
  
  // Filtrar el participante actual de la lista (usando useMemo para evitar recálculos)
  const personasDisponibles = useMemo(() => {
    return personas.filter(
      persona => persona.nombre !== participanteActual?.nombre
    )
  }, [personas, participanteActual?.nombre])
  
  // Filtrar personas según búsqueda
  const filteredPersonas = useMemo(() => {
    if (!searchTerm.trim()) {
      return personasDisponibles
    }
    const normalizedSearch = normalizeText(searchTerm)
    return personasDisponibles.filter(persona =>
      normalizeText(persona.nombre).includes(normalizedSearch)
    )
  }, [searchTerm, personasDisponibles])

  // Reiniciar búsqueda y mostrar lista cuando cambia el premio
  useEffect(() => {
    setSearchTerm('')
    setShowList(true)
  }, [premio.letra])

  // Ocultar lista cuando se selecciona alguien
  useEffect(() => {
    if (selectedPerson) {
      setShowList(false)
    }
  }, [selectedPerson])

  const handleSelect = (persona) => {
    onSelect(persona)
    setShowList(false) // Ocultar la lista al seleccionar
  }

  const handleChangeSelection = () => {
    setShowList(true) // Mostrar la lista de nuevo
    onSelect(null) // Limpiar selección
    setSearchTerm('') // Limpiar búsqueda
  }

  return (
    <div className="premio-screen">
      <div className="premio-content">
        <div className="premio-header">
          <div className="premio-letra">{premio.letra}</div>
          <h1 className="premio-nombre">{premio.nombre}</h1>
        </div>
        
        <div className="premio-descripcion">
          <p>{premio.descripcion}</p>
        </div>

        {showList && (
          <>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar persona..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="personas-list">
              {filteredPersonas.length === 0 ? (
                <p className="no-results">No se encontraron resultados</p>
              ) : (
                filteredPersonas.map((persona) => (
                  <div
                    key={persona.id}
                    className={`persona-item ${selectedPerson?.id === persona.id ? 'selected' : ''}`}
                    onClick={() => handleSelect(persona)}
                  >
                    {persona.nombre}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {selectedPerson && (
          <div className="selected-person">
            <p>Seleccionado: <strong>{selectedPerson.nombre}</strong></p>
            {!showList && (
              <button
                className="change-selection-button"
                onClick={handleChangeSelection}
              >
                Cambiar selección
              </button>
            )}
          </div>
        )}

        <button
          className="next-button"
          onClick={onNext}
          disabled={!selectedPerson}
        >
          Siguiente Premio
        </button>
      </div>
    </div>
  )
}

// Modal de contraseña
function PasswordModal({ onClose, onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'nestor') {
      setError('')
      onSuccess()
    } else {
      setError('Contraseña incorrecta')
      setPassword('')
    }
  }

  return (
    <div className="password-modal-overlay" onClick={onClose}>
      <div className="password-modal" onClick={(e) => e.stopPropagation()}>
        <button className="password-modal-close" onClick={onClose}>×</button>
        <h2 className="password-modal-title">Acceso Restringido</h2>
        <p className="password-modal-subtitle">Ingresa la contraseña para ver los resultados</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="password-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            autoFocus
          />
          {error && <p className="password-error">{error}</p>}
          <button type="submit" className="password-submit-button">
            Acceder
          </button>
        </form>
      </div>
    </div>
  )
}

// Pantalla de resultados finales
function ResultadosScreen({ onBack }) {
  const [resultados, setResultados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getResultados() {
      try {
        const { data, error } = await supabase
          .from('votaciones')
          .select('*')
          .order('nombre')

        if (error) {
          console.error('Error al obtener resultados:', error)
          setLoading(false)
          return
        }

        if (data) {
          // Encontrar los ganadores de cada premio
          const ganadores = PREMIOS.map((premio) => {
            const campoPremio = `premio${premio.letra}`
            const maxVotos = Math.max(...data.map(v => v[campoPremio] || 0))
            
            if (maxVotos === 0) {
              return {
                premio: premio,
                ganadores: [],
                votos: 0
              }
            }

            const ganadoresPremio = data
              .filter(v => (v[campoPremio] || 0) === maxVotos)
              .map(v => ({
                nombre: v.nombre,
                votos: v[campoPremio]
              }))

            return {
              premio: premio,
              ganadores: ganadoresPremio,
              votos: maxVotos
            }
          })

          setResultados(ganadores)
        }
      } catch (error) {
        console.error('Error al procesar resultados:', error)
      } finally {
        setLoading(false)
      }
    }

    getResultados()
  }, [])

  if (loading) {
    return (
      <div className="resultados-screen">
        <div className="resultados-content">
          <p>Cargando resultados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="resultados-screen">
      <div className="resultados-content">
        <h1 className="resultados-title">Resultados Finales</h1>
        <div className="resultados-list">
          {resultados.map((resultado) => (
            <div key={resultado.premio.letra} className="resultado-item">
              <div className="resultado-header">
                <span className="resultado-letra">{resultado.premio.letra}</span>
                <div>
                  <h2 className="resultado-premio-nombre">{resultado.premio.nombre}</h2>
                  <p className="resultado-descripcion">{resultado.premio.descripcion}</p>
                </div>
              </div>
              <div className="resultado-ganadores">
                {resultado.ganadores.length === 0 ? (
                  <p className="sin-ganadores">Aún no hay votos para este premio</p>
                ) : (
                  <>
                    <p className="resultado-votos">Votos: {resultado.votos}</p>
                    {resultado.ganadores.map((ganador, index) => (
                      <div key={index} className="ganador-item">
                        <span className="ganador-nombre">{ganador.nombre}</span>
                        <span className="ganador-votos">{ganador.votos} votos</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="resultados-back-button" onClick={onBack}>
          Volver al Resumen
        </button>
      </div>
    </div>
  )
}

// Pantalla de resumen final
function ResumenScreen({ selecciones, participanteActual }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showResultados, setShowResultados] = useState(false)

  const handleVerResultados = () => {
    setShowPasswordModal(true)
  }

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false)
    setShowResultados(true)
  }

  if (showResultados) {
    return <ResultadosScreen onBack={() => setShowResultados(false)} />
  }

  return (
    <div className="resumen-screen">
      <div className="resumen-content">
        <h1 className="resumen-title">Resumen de Votaciones</h1>
        {participanteActual && (
          <p className="resumen-participante">Votante: <strong>{participanteActual.nombre}</strong></p>
        )}
        <div className="resumen-list">
          {PREMIOS.map((premio, index) => (
            <div key={premio.letra} className="resumen-item">
              <div className="resumen-premio">
                <span className="resumen-letra">{premio.letra}</span>
                <span className="resumen-nombre">{premio.nombre}</span>
              </div>
              <div className="resumen-persona">
                {selecciones[index]?.nombre || 'No seleccionado'}
              </div>
            </div>
          ))}
        </div>
        <button className="ver-resultados-button" onClick={handleVerResultados}>
          Ver Resultados
        </button>
      </div>
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handlePasswordSuccess}
        />
      )}
    </div>
  )
}

// Componente principal de votación
function VotacionFlow() {
  const [personas, setPersonas] = useState([])
  const [loadingPersonas, setLoadingPersonas] = useState(true)
  const [participanteActual, setParticipanteActual] = useState(null)
  const [showSeleccionarParticipante, setShowSeleccionarParticipante] = useState(true)
  const [currentPremioIndex, setCurrentPremioIndex] = useState(0)
  const [selecciones, setSelecciones] = useState([])
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [showResumen, setShowResumen] = useState(false)

  useEffect(() => {
    // Simular carga para dar feedback al usuario
    setLoadingPersonas(true)
    
    setTimeout(() => {
      // Obtener nombres únicos (eliminar duplicados)
      const nombresUnicos = [...new Set(PARTICIPANTES_NOMBRES)]
      
      // Crear lista de personas con IDs
      const personasList = nombresUnicos.map((nombre, index) => ({
        id: index + 1,
        nombre: nombre.trim() // Eliminar espacios en blanco
      })).filter(persona => persona.nombre !== '') // Eliminar nombres vacíos
      
      setPersonas(personasList)
      setLoadingPersonas(false)
    }, 500) // Pequeño delay para mostrar el loading
  }, [])

  const handleParticipanteSelect = (participante) => {
    setParticipanteActual(participante)
    setShowSeleccionarParticipante(false)
  }

  const handleSelect = (persona) => {
    setSelectedPerson(persona)
  }

  const handleNext = async () => {
    if (!selectedPerson) return

    const newSelecciones = [...selecciones]
    newSelecciones[currentPremioIndex] = selectedPerson
    setSelecciones(newSelecciones)

    // Obtener la letra del premio actual
    const premioLetra = PREMIOS[currentPremioIndex].letra
    const campoPremio = `premio${premioLetra}`

    try {
      // Buscar si ya existe un registro para esta persona
      const { data: existingData, error: searchError } = await supabase
        .from('votaciones')
        .select('*')
        .eq('nombre', selectedPerson.nombre)
        .maybeSingle()

      if (searchError && searchError.code !== 'PGRST116') {
        console.error('Error al buscar registro:', searchError)
      }

      if (existingData) {
        // Si existe, incrementar el contador
        const nuevoValor = (existingData[campoPremio] || 0) + 1
        const { error: updateError } = await supabase
          .from('votaciones')
          .update({ [campoPremio]: nuevoValor })
          .eq('id', existingData.id)

        if (updateError) {
          console.error('Error al actualizar contador:', updateError)
        }
      } else {
        // Si no existe, crear un nuevo registro
        const nuevoRegistro = {
          nombre: selectedPerson.nombre,
          premioH: premioLetra === 'H' ? 1 : 0,
          premioE: premioLetra === 'E' ? 1 : 0,
          premioI: premioLetra === 'I' ? 1 : 0,
          premioS: premioLetra === 'S' ? 1 : 0
        }

        const { error: insertError } = await supabase
          .from('votaciones')
          .insert([nuevoRegistro])

        if (insertError) {
          console.error('Error al crear registro:', insertError)
        }
      }
    } catch (error) {
      console.error('Error al procesar votación:', error)
    }

    if (currentPremioIndex < PREMIOS.length - 1) {
      setCurrentPremioIndex(currentPremioIndex + 1)
      setSelectedPerson(null)
    } else {
      setShowResumen(true)
    }
  }


  if (showSeleccionarParticipante) {
    return (
      <SeleccionarParticipanteScreen
        personas={personas}
        onSelect={handleParticipanteSelect}
        loading={loadingPersonas}
      />
    )
  }

  if (showResumen) {
    return <ResumenScreen selecciones={selecciones} participanteActual={participanteActual} />
  }

  const currentPremio = PREMIOS[currentPremioIndex]

  return (
    <PremioScreen
      premio={currentPremio}
      personas={personas}
      participanteActual={participanteActual}
      onSelect={handleSelect}
      selectedPerson={selectedPerson}
      onNext={handleNext}
    />
  )
}

function App() {
  const [showVotacion, setShowVotacion] = useState(false)

  if (!showVotacion) {
    return <WelcomeScreen onStart={() => setShowVotacion(true)} />
  }

  return <VotacionFlow />
}

export default App

