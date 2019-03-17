import { ClientTypeModule } from './clienttype.module';

describe('ClientTypeModule', () => {
   let blackPageModule: ClientTypeModule;

   beforeEach(() => {
      blackPageModule = new ClientTypeModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});