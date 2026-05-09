class PaginationParams {
    
    public readonly limit: number;
    public readonly offset: number;
    public readonly page: number;

    constructor(
        limit?: number,
        offset?: number,
        page?: number
    ) {
        this.limit = limit || 10; // Default 10 items per page
        this.offset = offset || 0;  // Default start from beginning
        this.page = page || 1;     // Default first page
    }

    static fromQuery(query: any): PaginationParams {
        const limit = query.limit ? parseInt(query.limit) : undefined;
        const offset = query.offset ? parseInt(query.offset) : undefined;
        const page = query.page ? parseInt(query.page) : undefined;
        
        // Si se proporciona page, calcular offset automáticamente
        const calculatedOffset = page ? (page - 1) * (limit || 10) : offset;
        
        return new PaginationParams(limit, calculatedOffset, page);
    }
};

export default PaginationParams;
