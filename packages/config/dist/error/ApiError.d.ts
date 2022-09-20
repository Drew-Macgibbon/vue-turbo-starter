declare class ApiError {
    constructor(code: any, message: any);
    static badRequest(msg: any): ApiError;
    static internal(msg: any): ApiError;
}
export default ApiError;
//# sourceMappingURL=ApiError.d.ts.map