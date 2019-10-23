class TipoDispositivoModel {
    private _Id_TipoDispositivo: number;
    private _Descripcion_TipoDis: string;


    
    public get Id_TipoDispositivo(): number {
        return this._Id_TipoDispositivo;
    }
    public set Id_TipoDispositivo(value: number) {
        this._Id_TipoDispositivo = value;
    }
   
    public get Descripcion_TipoDis(): string {
        return this._Descripcion_TipoDis;
    }
    public set Descripcion_TipoDis(value: string) {
        this._Descripcion_TipoDis = value;
    }

}