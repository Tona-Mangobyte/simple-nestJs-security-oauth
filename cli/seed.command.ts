import * as chalk from 'chalk';
import * as ora from 'ora';
import {
  configureConnection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
  importSeed,
  runSeeder,
} from 'typeorm-seeding';
import { SeedCommand as BaseSeedCommand } from 'typeorm-seeding/dist/commands/seed.command';
import { importFiles, loadFiles } from 'typeorm-seeding/dist/utils/file.util';
import * as yargs from 'yargs';

export class SeedCommand extends BaseSeedCommand {
  constructor() {
    super();
  }

  async handler(args: yargs.Arguments) {
    args.configName = 'ormconfig.seed.ts';
    const log = console.log;
    log('🌱  ' + chalk.bold('TypeORM Seeding v0.0.1'));
    const spinner = ora('Loading ormconfig').start();
    const configureOption = {
      root: args.root as string,
      configName: args.configName as string,
      connection: args.connection as string,
    };

    // Get TypeORM config file
    let option: ConnectionOptions;
    try {
      configureConnection(configureOption);
      option = await getConnectionOptions();
      spinner.succeed('ORM Config loaded');
    } catch (error) {
      this.panic(spinner, error, 'Could not load the config file!');
    }

    // Find all factories and seed with help of the config
    spinner.start('Import Factories');
    const factoryFiles = loadFiles(option.factories);
    console.log('hi', factoryFiles);
    try {
      await importFiles(factoryFiles);
      spinner.succeed('Factories are imported');
    } catch (error) {
      this.panic(spinner, error, 'Could not import factories!');
    }

    // Show seeds in the console
    spinner.start('Importing Seeders');
    const seedFiles = loadFiles(option.seeds);
    let seedFileObjects: any[] = [];
    try {
      seedFileObjects = await Promise.all(seedFiles.map(importSeed));
      seedFileObjects = seedFileObjects.filter(
        (seedFileObject) =>
          args.seed === undefined || args.seed === seedFileObject.name,
      );
      spinner.succeed('Seeders are imported');
    } catch (error) {
      this.panic(spinner, error, 'Could not import seeders!');
    }

    // Get database connection and pass it to the seeder
    spinner.start('Connecting to the database');
    try {
      await createConnection();
      spinner.succeed('Database connected');
    } catch (error) {
      this.panic(
        spinner,
        error,
        'Database connection failed! Check your typeORM config file.',
      );
    }

    // Run seeds
    for (const seedFileObject of seedFileObjects) {
      spinner.start(`Executing ${seedFileObject.name} Seeder`);
      try {
        await runSeeder(seedFileObject);
        spinner.succeed(`Seeder ${seedFileObject.name} executed`);
      } catch (error) {
        spinner.fail(`Could not run the seed ${seedFileObject.name}!`);
        console.error(error);
        process.exit(1);
      }
    }

    log('👍 ', chalk.gray.underline('Finished Seeding'));
    process.exit(0);
  }

  panic(spinner: ora.Ora, error: Error, message: string) {
    spinner.fail(message);
    console.error(error);
    process.exit(1);
  }
}
