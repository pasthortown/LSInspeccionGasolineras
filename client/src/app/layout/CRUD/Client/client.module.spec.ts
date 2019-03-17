import { ClientModule } from './client.module';

describe('ClientModule', () => {
   let blackPageModule: ClientModule;

   beforeEach(() => {
      blackPageModule = new ClientModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});