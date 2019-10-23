
class ClientModel{
 
       private _Id_Cliente_Client: number;
        private _Nombre1: string;
        private _Nombre2: string;
        private _Apellido1: string;
        private _Apellido2: string;
        private _Direccion: string;
        private _Correo: string;
        private _Descripcion_Client: string;


    public get Id_Cliente_Client(): number {
        return this._Id_Cliente_Client;
    }
    public set Id_Cliente_Client(value: number) {
        this._Id_Cliente_Client = value;
    }
        
    public get Nombre1(): string {
        return this._Nombre1;
    }
    public set Nombre1(value: string) {
        this._Nombre1 = value;
    }
        
    public get Nombre2(): string {
        return this._Nombre2;
    }
    public set Nombre2(value: string) {
        this._Nombre2 = value;
    }
       
    public get Apellido1(): string {
        return this._Apellido1;
    }
    public set Apellido1(value: string) {
        this._Apellido1 = value;
    }
        
    public get Apellido2(): string {
        return this._Apellido2;
    }
    public set Apellido2(value: string) {
        this._Apellido2 = value;
    }
        
    public get Direccion(): string {
        return this._Direccion;
    }
    public set Direccion(value: string) {
        this._Direccion = value;
    }
        
    public get Correo(): string {
        return this._Correo;
    }
    public set Correo(value: string) {
        this._Correo = value;
    }
        
    public get Descripcion_Client(): string {
        return this._Descripcion_Client;
    }
    public set Descripcion_Client(value: string) {
        this._Descripcion_Client = value;
    }


}