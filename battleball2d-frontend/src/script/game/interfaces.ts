interface Collisionable {
  checkAttacked(): void;
  afterAttacked(params?: any): void;
}

export default Collisionable;