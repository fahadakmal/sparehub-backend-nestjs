import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

(async () => {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const seeder = appContext.get(SeederService);
      await seeder.seed();
      appContext.close();
    })
    .catch((error) => {
      throw error;
    });
})();
