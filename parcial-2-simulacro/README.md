# 🎮 Pre-Enunciado de Simulacro

| Tema: | **Gestor de Juegos** |
| --- | --- |
| Fecha: | Martes 17 de Junio |

El objetivo de la presente previsualización del simulacro del parcial es que el alumno pueda entrenarse en lo que va a ser el enunciado específico el material de base que acompaña este simulacro es lo que el alumno debería haber hecho con el pre-enunciado del parcial de acuerdo con las consignas aquí vertidas.  
El presente material ya está subido a un repositorio para que el alumno pueda trabajar desde ese punto al clonar el repositorio.

Repositorio del simulacro:  
<https://labsys.frc.utn.edu.ar/gitlab/desarrollo-de-software1/>  

## ✅ Contexto General

Se desea construir una aplicación web que permita gestionar un catálogo de videojuegos. La aplicación trabajará sobre una base de datos preexistente que contiene información sobre plataformas y juegos. La información de las plataformas está cargada y no requiere ABM.

El sistema deberá estar compuesto por:

* Un **backend en Node.js con Express y Sequelize** (proyecto pre-construido provisto).
* Un **frontend en React (Vite) con Bootstrap** (proyecto pre-construido provisto).

---

## 🔖 Requisitos del Backend

### Entidades involucradas

* **Plataforma**: tabla preexistente con los campos `id`, `nombre`.
* **Juego**: debe modelar los siguientes datos:

  * `id`
  * `nombre`
  * `fechaEstreno`
  * `urlWeb`
  * `genero`
  * `dearrollador`
  * `valoracion` (de 0 a 100)
  * `opiniones`
  * `idPlataforma` (clave foránea a Plataforma)

#### DER de la base de datos Propuesta

![picture 0](images/16370a199f87cb5058fc4408df269fe817f2c510deaa1003366bf032ac9f4179.png)  

### Reglas de validación

* No debe permitirse crear ni actualizar un juego con nombre repetido.
* No debe permitirse referenciar una plataforma inexistente.
* La fecha de estreno llega como fecha y debe almacenarse como número (getTime).

### API requerida

1. CRUD completo de juegos:

   * Listado completo paginado.
   * Alta, baja y modificación.
   * Validación de unicidad y plataforma existente.

2. Listados especiales:

   * `GET /api/juegos/populares`: los 10 juegos con mayor valoración que tengan al menos 500 opiniones.
   * `GET /api/juegos/estrenos`: los 10 juegos más recientes ordenados por fecha de estreno descendente.

3. Filtro avanzado:

   * `GET /api/juegos/filtrar`:

     * Filtros opcionales por: texto parcial en nombre, género o desarrollador.
     * Filtro por id de plataforma.
     * Límite de 50 resultados, ordenados por fecha de estreno descendente.

4. Conteo:

   * `GET /api/juegos/filtrar/count`: debe devolver la cantidad de coincidencias según los mismos filtros anteriores.

5. Listado de plataformas:

   * `GET /api/plataformas`: devuelve todas las plataformas sin paginar.

---

## 📃 Requisitos del Frontend

La interfaz React deberá contemplar:

1. **Pantalla de Listado y Búsqueda de Juegos**

   * Al iniciar muestra los juegos populares.
   * Permite buscar por texto, plataforma.
   * El botón "Limpiar filtros" vuelve a mostrar populares.
   * Cada fila debe mostrar:

     * Nombre
     * Plataforma
     * Género
     * Fecha estreno (en formato legible)
     * Valoración como estrellitas (1 a 5 según puntuación)
     * Número de opiniones
     * Acciones: Editar, Eliminar

2. **Pantalla de Altas y Modificaciones**

   * Utiliza React Hook Form.
   * Inputs para todos los campos del modelo.
   * Select para plataformas (obtenido del backend).
   * Validaciones:

     * Todos los campos requeridos.
     * Validación contra nombre repetido.
     * Plataforma debe ser válida.
     * Fecha transformada a numérico antes de enviarse.

3. **Pantalla de Últimos Estrenos**

   * Muestra tarjetas o grilla con los juegos lanzados más recientemente.

---

## 🚀 Recursos provistos

* Proyecto backend funcional con modelos, rutas y servicios completos (excepto una parte que se revelará en el parcial).
* Proyecto frontend con estructura de componentes y estilos base provistos.

---

## ⚠️ Importante

El día del parcial se solicitará una funcionalidad adicional vinculada a la visualización de la clasificación ESRB.

**Fin del pre-enunciado.**
