
import { Localidad } from './localidad'
import { ConfigBase } from './configBase';
import { User } from './user';

export class OfertaLaboral {
    id: number = null;
    oportunidad: string = null;
    descripcion: string = null;
    requisitos: string = null;
    tipo: string = null;
    vigencia: any = null;
    fecha_creacion: any = null;
    fecha_modificacion: any = null;
    localidad: Localidad = null;
    area: ConfigBase = null;
    nivel: ConfigBase = null;
    dominio: ConfigBase = null;
    usuario_creacion: any = null;
    usuario_modificacion: any = null;
    codigo: string = null;
    postulantes: any = null;
    activo: boolean = null;
}