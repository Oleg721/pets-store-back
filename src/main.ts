import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const protocol = process.env.PROTOCOL || 'http';
const host = process.env.API_HOST || 'localhost';
const port = process.env.PORT || 3000;
const apiVersion = process.env.API_PREFIX || 'api/v1';
const url = `${protocol}://${host}:${port}/${apiVersion}`;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// https://docs.nestjs.com/openapi/introduction
	// While the application is running, open your browser and navigate to http://localhost:3000/api/v1.
	// You should see the Swagger UI.

	const config = new DocumentBuilder()
		.setTitle('Pets store example')
		.setDescription('The pats API description')
		.setVersion('1.0')
		.addServer(url)
		.addTag('pets')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(apiVersion, app, document);

	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix(apiVersion);

	app.enableCors();
	({
		origin: [url],
		allowedHeaders: [
			'Accept',
			'Content-Type',
			'Origin',
			'api_key',
			'authorization',
			'x-requested-with',
			'Access-Control-Allow-Origin',
			'Referer',
			'Host',
		],
	});

	await app.listen(port);
}
bootstrap();
