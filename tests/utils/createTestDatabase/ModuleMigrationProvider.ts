import type { MigrationProvider, Migration } from "kysely";

export default class ModuleMigrationProvider implements MigrationProvider {
  // eslint-disable-next-line class-methods-use-this
  async getMigrations(): Promise<Record<string, Migration>> {
    // @ts-ignore
    const migrations: Record<string, Migration> = import.meta.glob(
      "../../../src/database/migrations/**.ts",
      {
        eager: true,
      }
    );

    return migrations;
  }
}
