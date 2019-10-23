class DispositivoModel{
    private _Id_Dispositivo: number;
    private _Id_TipoDispositivo_Disp: number;
    private _Id_Cliente_Disp: number;
    private _Descripcion_Disp: string;
    private _IP: string;


    
    public get Id_Dispositivo(): number {
        return this._Id_Dispositivo;
    }
    public set Id_Dispositivo(value: number) {
        this._Id_Dispositivo = value;
    }
    
    public get Id_TipoDispositivo_Disp(): number {
        return this._Id_TipoDispositivo_Disp;
    }
    public set Id_TipoDispositivo_Disp(value: number) {
        this._Id_TipoDispositivo_Disp = value;
    }
    
    public get Id_Cliente_Disp(): number {
        return this._Id_Cliente_Disp;
    }
    public set Id_Cliente_Disp(value: number) {
        this._Id_Cliente_Disp = value;
    }
   
    public get Descripcion_Disp(): string {
        return this._Descripcion_Disp;
    }
    public set Descripcion_Disp(value: string) {
        this._Descripcion_Disp = value;
    }
    
    public get IP(): string {
        return this._IP;
    }
    public set IP(value: string) {
        this._IP = value;
    }

}