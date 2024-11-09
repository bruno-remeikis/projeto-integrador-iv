import { IconType } from "react-icons/lib";
import { TbTextSpellcheck } from 'react-icons/tb';
import { CiSquareCheck } from "react-icons/ci";
import { SiWritedotas } from "react-icons/si";
import { GoTypography } from "react-icons/go";
import { GrWorkshop } from "react-icons/gr";

export type TestType = {
    name: string;
    description: string;
    Icon: IconType;
}

export const testTypes: { [key: string]: TestType } = {
    'Test': {
        name: 'Prova',
        description: 'Questões discursivas e objetivas',
        Icon: TbTextSpellcheck,
    },
    'Discursive': {
        name: 'Discursiva',
        description: '',
        Icon: GoTypography
    },
    'Objective': {
        name: 'Objetiva',
        description: '',
        Icon: CiSquareCheck
    },
    'Essay': {
        name: 'Redação',
        description: '',
        Icon: SiWritedotas
    },
    'Work': {
        name: 'Trabalho',
        description: 'Trabalho livre',
        Icon: GrWorkshop
    },
}