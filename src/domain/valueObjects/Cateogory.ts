class Category {
  private constructor(private readonly value: string) {}

  static FOOD = new Category("FOOD");
  static TRANSPORT = new Category("TRANSPORT");
  static LODGING = new Category("LODGING");
  static ACTIVITIES = new Category("ACTIVITIES");
  static OTHER = new Category("OTHER");

  getValue(): string {
    return this.value;
  }
}
