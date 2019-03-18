import { PaginaPruebaModule } from './pagina-prueba.module';

describe('PaginaPruebaModule', () => {
  let blackPageModule: PaginaPruebaModule;

  beforeEach(() => {
    blackPageModule = new PaginaPruebaModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
