class MesesModel {
    private _Id_Mes: number;
    private _Descripcion_Meses: string;



    
    public get Id_Mes(): number {
        return this._Id_Mes;
    }
    public set Id_Mes(value: number) {
        this._Id_Mes = value;
    }
    
    public get Descripcion_Meses(): string {
        return this._Descripcion_Meses;
    }
    public set Descripcion_Meses(value: string) {
        this._Descripcion_Meses = value;
    }

}