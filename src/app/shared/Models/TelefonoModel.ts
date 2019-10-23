class TelefonoModel{
    private _Id_Telefono: number;
    private _Id_Cliente_Telefono: number;
    private _Numero: string;
    private _Extension: string;

    


    public get Id_Telefono(): number {
        return this._Id_Telefono;
    }
    public set Id_Telefono(value: number) {
        this._Id_Telefono = value;
    }
    
    public get Id_Cliente_Telefono(): number {
        return this._Id_Cliente_Telefono;
    }
    public set Id_Cliente_Telefono(value: number) {
        this._Id_Cliente_Telefono = value;
    }
    
    public get Numero(): string {
        return this._Numero;
    }
    public set Numero(value: string) {
        this._Numero = value;
    }
   
    public get Extension(): string {
        return this._Extension;
    }
    public set Extension(value: string) {
        this._Extension = value;
    }


}