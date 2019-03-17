import { EstablishmentModule } from './establishment.module';

describe('EstablishmentModule', () => {
   let blackPageModule: EstablishmentModule;

   beforeEach(() => {
      blackPageModule = new EstablishmentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});