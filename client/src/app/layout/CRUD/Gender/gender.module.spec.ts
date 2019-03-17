import { GenderModule } from './gender.module';

describe('GenderModule', () => {
   let blackPageModule: GenderModule;

   beforeEach(() => {
      blackPageModule = new GenderModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});