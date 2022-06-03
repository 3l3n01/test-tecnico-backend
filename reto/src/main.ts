import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const Options: SwaggerCustomOptions = {
    customSiteTitle: 'API Docs',
  };

  const config = new DocumentBuilder()
    .setTitle('Donations Api')
    .setDescription(
      'API to consult and recover a concentrate of the last 5 years by country of donations from different organizations',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, Options);

  await app.listen(3001);
}
bootstrap();
