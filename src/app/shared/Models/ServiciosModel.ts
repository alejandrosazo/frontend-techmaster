class ServiciosModel {
    private _Id_Servicio: number;
    private _Id_Cliente_Servicio: number;
    private _Descripcion_Servicio: string;
    private _Velocidad: string;
    private _Tipo: string;

    
    public get Id_Servicio(): number {
        return this._Id_Servicio;
    }
    public set Id_Servicio(value: number) {
        this._Id_Servicio = value;
    }
    
    public get Id_Cliente_Servicio(): number {
        return this._Id_Cliente_Servicio;
    }
    public set Id_Cliente_Servicio(value: number) {
        this._Id_Cliente_Servicio = value;
    }
   
    public get Descripcion_Servicio(): string {
        return this._Descripcion_Servicio;
    }
    public set Descripcion_Servicio(value: string) {
        this._Descripcion_Servicio = value;
    }
    
    public get Velocidad(): string {
        return this._Velocidad;
    }
    public set Velocidad(value: string) {
        this._Velocidad = value;
    }
    
    public get Tipo(): string {
        return this._Tipo;
    }
    public set Tipo(value: string) {
        this._Tipo = value;
    }



}