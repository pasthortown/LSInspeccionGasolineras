import { RolModule } from './rol.module';

describe('RolModule', () => {
   let blackPageModule: RolModule;

   beforeEach(() => {
      blackPageModule = new RolModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});