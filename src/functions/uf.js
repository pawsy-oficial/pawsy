function siglaParaId(sigla) {
    switch (sigla) {
        case 'AC':
            return 1;
        case 'AL':
            return 2;
        case 'AP':
            return 3;
        case 'AM':
            return 4;
        case 'BA':
            return 5;
        case 'CE':
            return 6;
        case 'DF':
            return 7;
        case 'ES':
            return 8;
        case 'GO':
            return 9;
        case 'MA':
            return 10;
        case 'MS':
            return 11;
        case 'MT':
            return 12;
        case 'MG':
            return 13;
        case 'PA':
            return 14;
        case 'PB':
            return 15;
        case 'PR':
            return 16;
        case 'PE':
            return 17;
        case 'PI':
            return 18;
        case 'RJ':
            return 19;
        case 'RN':
            return 20;
        case 'RS':
            return 21;
        case 'RO':
            return 22;
        case 'RR':
            return 23;
        case 'SC':
            return 24;
        case 'SP':
            return 25;
        case 'SE':
            return 26;
        case 'TO':
            return 27;
        default:
            return 'Sigla de estado não encontrada';
    }
}

export default siglaParaId