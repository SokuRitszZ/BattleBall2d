interface Collisionable {
  checkAttacked(): void;
  afterAttacked(): void;
}

export default Collisionable;