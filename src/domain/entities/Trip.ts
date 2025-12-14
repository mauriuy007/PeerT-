class Trip {
    private readonly id: number;
    private name: Name;
    private startDate: StartDate;
    
    constructor(id: number, name: Name, startDate: StartDate) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
    }
}