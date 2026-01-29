// Interfaces

interface IEstudiante {
    id: number;
    nombre: string;
    edad: number;
    carrera: string;
    activo: boolean;
    promedio: number;
}

interface IResultado<T> {
    ok: boolean;
    mensaje: string;
    data?: T; 
}

// Clases

class Estudiante implements IEstudiante {
    constructor(
        public id: number,
        public nombre: string,
        public edad: number,
        public carrera: string,
        public activo: boolean,
        public promedio: number
    ) {}
}

class SistemaEstudiantes {
    private estudiantes: Estudiante[] = [];

    agregar(est: Estudiante): IResultado<Estudiante> {
        for (let i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].id === est.id) {
                return { ok: false, mensaje: `Error: El ID ${est.id} ya existe.` };
            }
        }
        if (est.edad < 15 || est.edad > 80) {
            return { ok: false, mensaje: `Error: La edad debe estar entre 15 y 80 años.` };
        }
        if (est.promedio < 0 || est.promedio > 10) {
            return { ok: false, mensaje: `Error: El promedio debe ser entre 0 y 10.` };
        }
        this.estudiantes.push(est);
        return { ok: true, mensaje: "Estudiante agregado con éxito", data: est };
    }

    
    listar(): Estudiante[] {
        return this.estudiantes;
    }
    buscarPorId(id: number): IResultado<Estudiante> {
        for (let i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].id === id) {
                return { ok: true, mensaje: "Estudiante encontrado", data: this.estudiantes[i] };
            }
        }
        return { ok: false, mensaje: `No se encontró estudiante con ID ${id}` };
    }
    actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> {
        if (nuevoPromedio < 0 || nuevoPromedio > 10) {
            return { ok: false, mensaje: "Error: El promedio debe ser entre 0 y 10." };
        }

        let resultadoBusqueda = this.buscarPorId(id);

        if (resultadoBusqueda.ok && resultadoBusqueda.data) {
            resultadoBusqueda.data.promedio = nuevoPromedio;
            return { ok: true, mensaje: "Promedio actualizado", data: resultadoBusqueda.data };
        } else {
            return resultadoBusqueda;
        }
    }
    cambiarEstado(id: number, nuevoEstado: boolean): IResultado<Estudiante> {
        let resultadoBusqueda = this.buscarPorId(id);

        if (resultadoBusqueda.ok && resultadoBusqueda.data) {
            resultadoBusqueda.data.activo = nuevoEstado;
            let estadoTexto = nuevoEstado ? "Activo" : "Inactivo";
            return { ok: true, mensaje: `Estado cambiado a ${estadoTexto}`, data: resultadoBusqueda.data };
        } else {
            return resultadoBusqueda;
        }
    }

    listarActivos(): Estudiante[] {
        return this.estudiantes.filter(est => est.activo === true);
    }

    promedioGeneral(): number {
        if (this.estudiantes.length === 0) return 0;

        let suma = 0;
        for (let est of this.estudiantes) {
            suma += est.promedio;
        } 
        return suma / this.estudiantes.length;
    }
}

// Funciones obligatorias

function mostrarMenu(): void {
    console.log("\n--- SISTEMA DE GESTIÓN DE ESTUDIANTES ---");
    console.log("Sistema inicializado y listo para recibir comandos...");
}

function ejecutarDemo(sistema: SistemaEstudiantes): void {
    mostrarMenu();

    console.log("\n1) AGREGANDO 3 ESTUDIANTES...");
    
    let res1 = sistema.agregar(new Estudiante(1, "Juan Perez", 20, "Sistemas", true, 8.5));
    console.log(`- Agregando Juan: ${res1.mensaje}`);

    
    let res2 = sistema.agregar(new Estudiante(2, "Maria Lopez", 22, "Diseño", true, 9.0));
    console.log(`- Agregando Maria: ${res2.mensaje}`);

    
    let res3 = sistema.agregar(new Estudiante(3, "Carlos Ruiz", 19, "Derecho", true, 7.5));
    console.log(`- Agregando Carlos: ${res3.mensaje}`);
    
    let resError = sistema.agregar(new Estudiante(4, "Niño", 10, "Nada", true, 10)); 
    console.log(`- Intento edad incorrecta: ${resError.mensaje}`);


    console.log("\n2) LISTAR TODOS:");
    console.table(sistema.listar());


    console.log("\n3) BUSCAR POR ID (ID: 2):");
    let busqueda = sistema.buscarPorId(2);
    if (busqueda.ok) {
        console.log("Encontrado:", busqueda.data);
    } else {
        console.log(busqueda.mensaje);
    }


    console.log("\n4) ACTUALIZAR PROMEDIO (ID: 1, Nuevo Promedio: 9.8):");
    let actualizacion = sistema.actualizarPromedio(1, 9.8);
    console.log(actualizacion.mensaje);


    console.log("\n5) CAMBIAR ESTADO A INACTIVO (ID: 3):");
    let cambio = sistema.cambiarEstado(3, false);
    console.log(cambio.mensaje);


    console.log("\n6) LISTAR SOLO ACTIVOS:");
    
    console.table(sistema.listarActivos());


    console.log("\n7) PROMEDIO GENERAL DEL CURSO:");
    
    let promedio = sistema.promedioGeneral();
   
    console.log(`El promedio general es: ${promedio.toFixed(2)}`);
}

const miSistema = new SistemaEstudiantes();

ejecutarDemo(miSistema);