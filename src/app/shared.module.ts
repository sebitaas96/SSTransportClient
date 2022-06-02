import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { nombreValidatorDirective } from './validators/nombre.validator';
import { tipoEmpresaValidatorDirective } from './validators/tipoEmpresa.validator';
import { documentoValidatorDirective } from './validators/documento.validator';
import { paisValidatorDirective } from './validators/pais.validator';
import { provinciaValidatorDirective } from './validators/provincia.validator';
import { localidadValidatorDirective } from './validators/localidad.validator';
import { tipoviaValidatorDirective } from './validators/tipovia.validator';
import { direccionValidatorDirective } from './validators/direccion.validator';
import { numeroValidatorDirective } from './validators/numero.validator';
import { prefijoValidatorDirective } from './validators/prefijo.validator';
import { telefonoValidatorDirective } from './validators/telefono.validator';
import { emailValidatorDirective } from './validators/email.validator';
import { passwordValidatorDirective } from './validators/password.validator';
import { checkboxValidatorDirective } from './validators/checkbox.validator';
import { nombreUsuarioValidatorDirective } from './validators/nombreUsuario.validator';
import {fInicioValidtor} from './validators/finicio.validator';
import {fFinValidtor} from './validators/ffin.validator';
import {descripcionValidatorDirective} from './validators/descripcion.validator';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        nombreValidatorDirective,
        tipoEmpresaValidatorDirective,
        documentoValidatorDirective,
        paisValidatorDirective,
        provinciaValidatorDirective,
        localidadValidatorDirective,
        tipoviaValidatorDirective,
        direccionValidatorDirective,
        numeroValidatorDirective,
        prefijoValidatorDirective,
        telefonoValidatorDirective,
        emailValidatorDirective,
        checkboxValidatorDirective,
        passwordValidatorDirective,
        nombreUsuarioValidatorDirective,
        fInicioValidtor,
        fFinValidtor,
        descripcionValidatorDirective
    ],
    exports: [
        nombreValidatorDirective,
        tipoEmpresaValidatorDirective,
        documentoValidatorDirective,
        paisValidatorDirective,
        provinciaValidatorDirective,
        localidadValidatorDirective,
        tipoviaValidatorDirective,
        direccionValidatorDirective,
        numeroValidatorDirective,
        prefijoValidatorDirective,
        telefonoValidatorDirective,
        emailValidatorDirective,
        checkboxValidatorDirective,
        passwordValidatorDirective,
        nombreUsuarioValidatorDirective,
        fInicioValidtor,
        fFinValidtor,
        descripcionValidatorDirective
    ]
    })
    export class SharedModule {}