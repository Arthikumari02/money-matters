export abstract class BaseModel<T> {
  protected props: T;
  
  constructor(props: T) {
    this.props = { ...props };
  }

  get id(): string {
    return (this.props as any).id;
  }

  toJSON(): T {
    return { ...this.props };
  }
}
