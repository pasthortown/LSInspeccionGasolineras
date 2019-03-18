import { RegisterPersonaModule } from './register-persona.module';

describe('RegisterPersonaModule', () => {
  let blackPageModule: RegisterPersonaModule;

  beforeEach(() => {
    blackPageModule = new RegisterPersonaModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
