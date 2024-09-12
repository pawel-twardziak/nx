import { CommandModule } from 'yargs';
import { linkToNxDevAndExamples } from '../yargs-utils/documentation';
import {
  withAffectedOptions,
  withBatch,
  withConfiguration,
  withOutputStyleOption,
  withOverrides,
  withRunOptions,
  withTargetAndConfigurationOption,
} from '../yargs-utils/shared-options';
import { handleErrors } from '../../utils/params';
import { NxArgs } from '../../utils/command-line-utils';

export type AffectedOptions = NxArgs & {
  onlyAffectedByTouched?: boolean;
  target?: string;
  __overrides_unparsed__: string[];
};

export const yargsAffectedCommand: CommandModule<AffectedOptions> = {
  command: 'affected',
  describe: 'Run target for affected projects.',
  builder: (yargs) =>
    linkToNxDevAndExamples(
      withAffectedOptions(
        withRunOptions(
          withOutputStyleOption(
            withTargetAndConfigurationOption(withBatch(yargs))
          )
        )
      )
        .option('all', {
          type: 'boolean',
          deprecated: 'Use `nx run-many` instead',
        })
        .middleware((args) => {
          if (args.all !== undefined) {
            throw new Error(
              "The '--all' option has been removed for `nx affected`. Use 'nx run-many' instead."
            );
          }
        }),
      'affected'
    ),
  handler: async (args) => {
    const exitCode = await handleErrors(
      (args.verbose as boolean) ?? process.env.NX_VERBOSE_LOGGING === 'true',
      async () => {
        return (await import('./affected')).affected(
          'affected',
          withOverrides(args)
        );
      }
    );
    process.exit(exitCode);
  },
};

export const yargsAffectedTestCommand: CommandModule<AffectedOptions> = {
  command: 'affected:test',
  describe: false,
  builder: (yargs) =>
    linkToNxDevAndExamples(
      withAffectedOptions(
        withRunOptions(withOutputStyleOption(withConfiguration(yargs)))
      ),
      'affected'
    ),
  handler: async (args) => {
    const exitCode = await handleErrors(
      (args.verbose as boolean) ?? process.env.NX_VERBOSE_LOGGING === 'true',
      async () => {
        return (await import('./affected')).affected('affected', {
          ...withOverrides(args),
          target: 'test',
        });
      }
    );
    process.exit(exitCode);
  },
};

export const yargsAffectedBuildCommand: CommandModule<AffectedOptions> = {
  command: 'affected:build',
  describe: false,
  builder: (yargs) =>
    linkToNxDevAndExamples(
      withAffectedOptions(
        withRunOptions(withOutputStyleOption(withConfiguration(yargs)))
      ),
      'affected'
    ),
  handler: async (args) => {
    const exitCode = await handleErrors(
      (args.verbose as boolean) ?? process.env.NX_VERBOSE_LOGGING === 'true',
      async () => {
        return (await import('./affected')).affected('affected', {
          ...withOverrides(args),
          target: 'build',
        });
      }
    );
    process.exit(exitCode);
  },
};

export const yargsAffectedLintCommand: CommandModule<AffectedOptions> = {
  command: 'affected:lint',
  describe: false,
  builder: (yargs) =>
    linkToNxDevAndExamples(
      withAffectedOptions(
        withRunOptions(withOutputStyleOption(withConfiguration(yargs)))
      ),
      'affected'
    ),
  handler: async (args) => {
    const exitCode = await handleErrors(
      (args.verbose as boolean) ?? process.env.NX_VERBOSE_LOGGING === 'true',
      async () => {
        return (await import('./affected')).affected('affected', {
          ...withOverrides(args),
          target: 'lint',
        });
      }
    );
    process.exit(exitCode);
  },
};

export const yargsAffectedE2ECommand: CommandModule<AffectedOptions> = {
  command: 'affected:e2e',
  describe: false,
  builder: (yargs) =>
    linkToNxDevAndExamples(
      withAffectedOptions(
        withRunOptions(withOutputStyleOption(withConfiguration(yargs)))
      ),
      'affected'
    ),
  handler: async (args) => {
    const exitCode = await handleErrors(
      (args.verbose as boolean) ?? process.env.NX_VERBOSE_LOGGING === 'true',
      async () => {
        return (await import('./affected')).affected('affected', {
          ...withOverrides(args),
          target: 'e2e',
        });
      }
    );
    process.exit(exitCode);
  },
};
