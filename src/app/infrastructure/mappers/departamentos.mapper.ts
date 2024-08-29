import { Departamentos } from "@/app/domain/entities";


export class DepartamentosMapper {

    static mapFromApiToDomain(result: Departamentos): Departamentos {

        return  {
            accion : result.accion,
            agrupaDir : result.agrupaDir,
            agrupaPoa : result.agrupaPoa,
            descripcion :  result.descripcion,
            empRespon :  result.empRespon,
            id : result.id,
            idCea : result.idCea,
            idReporta : result.idReporta,
            idShpoa : result.idShpoa,
            meta : result.meta,
            nivel : result.nivel,
            oficial: result.oficial,
            prog : result.prog,
        }
    }
}