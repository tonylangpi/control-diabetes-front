
export const pacientes = [
  {
    accessorKey: "Id_Paciente",
    header: "Codigo Paciente",
    enableEditing: false,
    size: 80,
  },
  {
    accessorKey: "Nombres",
    header: "Nombre",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Apellidos",
    header: "Apellidos",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Telefono",
    header: "Telefono",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "DPI",
    header: "DPI",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Fecha_Nacimiento",
    header: "Fecha Nacimiento",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Correo",
    header: "Correo",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Direccion",
    header: "Direccion",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Tipo_de_Sangre",
    header: "Tipo de Sangre",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Cuadro_Clinico",
    header: "Cuadro Clinico",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Genero",
    header: "Genero",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Estado",
    header: "Estado",
    enableEditing: true,
    size: 200,
  },
];

export const TipoDiabetesT = [
  {
    accessorKey: "ID_Diabetes",
    header: "Codigo Diabetes",
    enableEditing: false,
    size: 80,
  },
  {
    accessorKey: "Descripcion",
    header: "Tipo de Diabetes",
    enableEditing: true,
    size: 200,
  }

];

export const Medicamentoss = [
  {
    accessorKey: "Id_Medicamento",
    header: "Codigo Medicamento",
    enableEditing: false,
    size: 80,
  },
  {
    accessorKey: "Descripcion",
    header: "Medicamento",
    enableEditing: true,
    size: 200,
  }

];

export const ExpedientesByPaciente = [
  {
    accessorKey: "Id_Ficha",
    header: "Codigo de Expediente",
    enableEditing: false,
    size: 80,
  },
  {
    accessorKey: "Motivo_Consulta",
    header: "Motivo de la consulta",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Id_Paciente",
    header: "Codigo de paciente",
    enableEditing: true,
    size: 100,
  },
  {
    accessorKey: "Usuario",
    header: "Usuario Autorizado",
    enableEditing: true,
    size: 100,
  },
  {
    accessorKey: "Tipo_Diabetes",
    header: "Tipo de diabetes diagnosticada",
    enableEditing: true,
    size: 50,
  },
  {
    accessorKey: "Fecha",
    header: "Fecha de creacion",
    enableEditing: true,
    size: 50,
  },
  {
    accessorKey: "Diagnostico",
    header: "Diagnostico",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Proxima_visita",
    header: "Proxima visita",
    enableEditing: true,
    size: 50,
  },
  {
    accessorKey: "Nivel_Azucar",
    header: "Nivel de azucar registrado",
    enableEditing: true,
    size: 100,
  },
  {
    accessorKey: "Recomendaciones",
    header: "Recomendaciones",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Estado",
    header: "Estado",
    enableEditing: true,
    size: 200,
  }
];

export const Receta = [
  {
    accessorKey: "ID_RECETA",
    header: "Codigo Receta",
    enableEditing: false,
    size: 80,
  },
  {
    accessorKey: "Descripcion",
    header: "Medicamento",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "ID_FICHA",
    header: "Registro de la Ficha",
    enableEditing: false,
    size: 200,
  }
  ,
  {
    accessorKey: "Instruccion",
    header: "Instruccion",
    enableEditing: true,
    size: 200,
  }
];

export const Ficha_Medica = [
  {
    accessorKey: "Id_Ficha",
    header: "Codigo Expediente",
    enableEditing: false,
    size: 80,
  },
  {
    accessorKey: "DPI",
    header: "Numero de Identificación",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Nombres",
    header: "Nombres",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Apellidos",
    header: "Apellidos",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Fecha",
    header: "Fecha",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Estado",
    header: "Estado",
    enableEditing: true,
    size: 200,
  },
];

export const UsuariosColumnas = [
  {
    accessorKey: "ID_Usuario",
    header: "Codigo Usuario",
    enableEditing: false,
    size: 80,
  },
  {
    accessorKey: "Nombres",
    header: "Nombres",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Apellidos",
    header: "Apellidos",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Correo",
    header: "Correo registrado",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Descripcion",
    header: "Rol",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Estado",
    header: "Estado",
    enableEditing: true,
    size: 200,
  }
]
export const Azucarrr = [
 
  {
    accessorKey: "Id_toma",
    header: "Codigo Control",
    enableEditing: false,
    size: 200,
  },
  {
    accessorKey: "Nombres",
    header: "Nombre del Paciente",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Apellidos",
    header: "Apellidos del Paciente",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Fecha",
    header: "Fecha",
    enableEditing: true,
    size: 200,
  },
  {
    accessorKey: "Nivel_azucar",
    header: "Nivel Azucar",
    enableEditing: true,
    size: 200,
  }

];