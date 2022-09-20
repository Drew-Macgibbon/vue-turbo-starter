import { OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class AppService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
//# sourceMappingURL=app.service.d.ts.map