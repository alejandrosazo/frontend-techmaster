class UserModel {
    private _Id_Usuario: number;
    private _Usuario_UserName: string;
    private _Usuario_Password: string;
    private _Usuario_Nombre: string;
    private _Usuario_Apellido: string;
    private _Usuario_Correo: string;
    
    
    public get Id_Usuario(): number {
        return this._Id_Usuario;
    }
    public set Id_Usuario(value: number) {
        this._Id_Usuario = value;
    }
    
    public get Usuario_UserName(): string {
        return this._Usuario_UserName;
    }
    public set Usuario_UserName(value: string) {
        this._Usuario_UserName = value;
    }
    
    public get Usuario_Password(): string {
        return this._Usuario_Password;
    }
    public set Usuario_Password(value: string) {
        this._Usuario_Password = value;
    }
    
    public get Usuario_Nombre(): string {
        return this._Usuario_Nombre;
    }
    public set Usuario_Nombre(value: string) {
        this._Usuario_Nombre = value;
    }
    
    public get Usuario_Apellido(): string {
        return this._Usuario_Apellido;
    }
    public set Usuario_Apellido(value: string) {
        this._Usuario_Apellido = value;
    }
    
    public get Usuario_Correo(): string {
        return this._Usuario_Correo;
    }
    public set Usuario_Correo(value: string) {
        this._Usuario_Correo = value;
    }
}