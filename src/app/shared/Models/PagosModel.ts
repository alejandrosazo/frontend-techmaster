class PagosModel {
    private _Id_Cliente_Pago: number;
    private _Id_Pago: number;
    private _Id_Servicio_Pago: number;
    private _Id_Mes_Pago: number;
    private _Fecha: Date;

    

    public get Id_Cliente_Pago(): number {
        return this._Id_Cliente_Pago;
    }
    public set Id_Cliente_Pago(value: number) {
        this._Id_Cliente_Pago = value;
    }
    
    public get Id_Pago(): number {
        return this._Id_Pago;
    }
    public set Id_Pago(value: number) {
        this._Id_Pago = value;
    }
    
    public get Id_Servicio_Pago(): number {
        return this._Id_Servicio_Pago;
    }
    public set Id_Servicio_Pago(value: number) {
        this._Id_Servicio_Pago = value;
    }
    
    public get Id_Mes_Pago(): number {
        return this._Id_Mes_Pago;
    }
    public set Id_Mes_Pago(value: number) {
        this._Id_Mes_Pago = value;
    }
    private _Monto: number;
    public get Monto(): number {
        return this._Monto;
    }
    public set Monto(value: number) {
        this._Monto = value;
    }
    
    public get Fecha(): Date {
        return this._Fecha;
    }
    public set Fecha(value: Date) {
        this._Fecha = value;
    }

}