// src/container/requestContainer.ts
import { registerScoped } from "./registrations";

export class Scope {
  private instances = new Map<symbol, any>();
  private factories = registerScoped();

  resolve<T>(token: symbol): T {
    if (!this.instances.has(token)) {
      const factory = this.factories[token];
      if (!factory) {
        throw new Error(`No factory registered for token`);
      }
      this.instances.set(token, factory(this));
    }
    return this.instances.get(token);
  }
}
