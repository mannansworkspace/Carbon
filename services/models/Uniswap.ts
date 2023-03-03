
interface Colors {
    accent: string;
    container: string;
    module: string;
    interactive: string;
    outline: string;
    dialog: string;
    primary: string;
    onAccent: string;
    secondary: string;
    hint: string;
    onInteractive: string;
    active: string;
    success: string;
    warning: string;
    error: string;
    currentColor: 'currentColor';
}
interface Attributes {
    borderRadius: boolean | number;
    fontFamily: string;
    fontFamilyVariable: string;
    fontFamilyCode: string;
    tokenColorExtraction: boolean;
}
export interface Theme extends Partial<Attributes>, Partial<Colors> {
}
