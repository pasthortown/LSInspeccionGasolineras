import { RegisterClientModule } from './register-client.module';

describe('RegisterClientModule', () => {
  let blackPageModule: RegisterClientModule;

  beforeEach(() => {
    blackPageModule = new RegisterClientModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
